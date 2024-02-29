"use client";
// Import necessary Chakra UI components
import { useEffect, useState, useRef } from "react";

import {
  Button,
  Input,
  Box,
  Text,
  VStack,
  HStack,
  List,
  ListItem,
} from "@chakra-ui/react";

type FlexibleStringTupleArray = Array<[string, string]>;

export default function Game() {
  const [cards, setCards] = useState<FlexibleStringTupleArray>([]);
  const [numPlayers, setNumPlayers] = useState<number>(2);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const connectWebSocket = () => {
    ws.current = new WebSocket("ws://localhost:8080");
    ws.current.onopen = () => console.log("Connected to the server");
    ws.current.onmessage = ({ data }) => {
      const response = JSON.parse(data);
      if (response.action === "deal") {
        setCards(response.cards);
      } else if (
        response.action === "flop" ||
        response.action === "turn" ||
        response.action === "river"
      ) {
        console.log(`${response.action.toUpperCase()} : `, response);
      }
    };
  };

  const sendNumPlayers = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({ action: "setPlayers", value: numPlayers })
      );
    }
  };

  const shuffleAndDeal = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ action: "shuffle", value: numPlayers }));
    }
  };

  const sendAction = (action: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ action }));
    }
  };

  return (
    <Box p={5}>
      <VStack spacing={4}>
        <Text fontSize="2xl">Next.js Card Game</Text>
        <Button onClick={connectWebSocket}>Connect</Button>
        <HStack>
          <Input
            id="numPlayers"
            type="number"
            value={numPlayers}
            onChange={(e) => setNumPlayers(parseInt(e.target.value, 10))}
            min="1"
            max="4"
            placeholder="Number of Players"
          />
          <Button onClick={sendNumPlayers}>Enter Number of Players</Button>
        </HStack>
        <HStack>
          <Button onClick={shuffleAndDeal}>Shuffle</Button>
          <Button onClick={() => sendAction("flop")}>Flop</Button>
          <Button onClick={() => sendAction("turn")}>Turn</Button>
          <Button onClick={() => sendAction("river")}>River</Button>
        </HStack>
        <Text>Dealt Cards:</Text>
        <List>
          {cards.map((card, index) => (
            <ListItem key={index}>{`${card[0]}, ${card[1]}`}</ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
}
