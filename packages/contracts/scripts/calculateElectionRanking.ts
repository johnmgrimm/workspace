import { BigNumber } from "@ethersproject/bignumber";
import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers, providers, Wallet } from "ethers";
import { ElectionMetadata } from "packages/utils/src/Contracts";
import GrantElectionsJSON from "../artifacts/contracts/GrantElections.sol/GrantElections.json";
import RandomNumberConsumerJSON from "../artifacts/contracts/RandomNumberConsumer.sol/RandomNumberConsumer.json";

import { GrantElections } from "../typechain";
import { GrantElectionAdapter } from "./helpers/GrantElectionAdapter";
import { merklize } from "./merkle";

interface awardee {
  beneficiary: string;
  votes: BigNumber;
}

async function shuffleAwardees(awardees:awardee[], provider:JsonRpcProvider):Promise<awardee[]>{
  const randomNumberConsumer = new ethers.Contract(
    process.env.ADDR_RANDOM_NUMBER,
    RandomNumberConsumerJSON.abi
  );
  const currentBlock = await provider.getBlock("latest");
  await randomNumberConsumer.getRandomNumber(
    Number(ethers.utils.defaultAbiCoder.encode([ "uint256", "bytes32" ], [ currentBlock.timestamp, currentBlock.hash ]))
  );
  const randomNumber = randomNumberConsumer.randomResult();
  for (let i = 0; i < awardees.length; i++) {
    let n = i + (randomNumber % (awardees.length - i));
    awardees[n], awardees[i] = awardees[i], awardees[n];
  }
  return awardees
}

function countVotes(electionMetaData:ElectionMetadata): awardee[] {
  const awardees: awardee[] = [];
  electionMetaData.votes.forEach((vote) => {
    const awardee = awardees.find(
      (awardee) => awardee.beneficiary == vote.beneficiary
    );
    if (awardee == undefined) {
      awardees.push({ beneficiary: vote.beneficiary, votes: vote.weight });
    } else {
      awardee.votes.add(vote.weight);
    }
  });
  return awardees;
}

async function rankAwardees(electionMetaData:ElectionMetadata, provider:JsonRpcProvider): Promise<string[]> {
  let awardees = countVotes(electionMetaData);
  awardees.sort(
    (a, b) => Number(a.votes.toString()) - Number(b.votes.toString())
  );
  if(electionMetaData.useChainlinkVRF){
    awardees = await shuffleAwardees(awardees, provider)
  }
  const cutOff = electionMetaData.configuration.awardees;
  return awardees.slice(0,cutOff).map(awardee => awardee.beneficiary);
}

async function finalizeElection(term: number, provider:JsonRpcProvider,wallet:Wallet ):Promise<void> {
  console.log("finalize current grant election of term: " + term )
  const grantElection = new ethers.Contract(
    process.env.ADDR_GRANT_ELECTION,
    GrantElectionsJSON.abi
  ) as GrantElections;
  console.log("getting election meta data...")
  const electionMetaData:ElectionMetadata = await GrantElectionAdapter(grantElection).getElectionMetadata(term);
  console.log("ranking awardees...")
  const winner = rankAwardees(electionMetaData, provider);
  console.log("and the winner are: " + winner)
  console.log("creating merkle root...")
  const merkleTree = merklize(winner);
  const merkleRoot = "0x" + merkleTree.getRoot().toString("hex");
  console.log("and the merkle root is: " + merkleRoot)
  console.log("finalizing grant election...")
  await grantElection.connect(wallet).finalize(term, merkleRoot)
  console.log("grant election finalized")
}


function main(){
  const provider = new providers.JsonRpcProvider(process.env.RPC_URL, process.env.CHAIN_ID)
  const wallet = new ethers.Wallet(process.env.ACCOUNT).connect(provider)
  finalizeElection(Number(process.argv.slice(2)[0]), provider, wallet)
}

//run this script with 'npx ts-node ./calculateElectionRanking.ts term' where term is 0,1,2
main()