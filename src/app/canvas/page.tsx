"use client";
// src/App.tsx
// src/App.tsx
import React, { useEffect, useRef } from "react";
import { ChakraProvider, Box, Heading, Button, HStack } from "@chakra-ui/react";
import Phaser from "phaser";

const App: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<Phaser.Scene | null>(null);

  useEffect(() => {
    // Phaser Scene 정의
    class CustomCardGameScene extends Phaser.Scene {
      private cards: Phaser.GameObjects.Image[] = [];
      private deck: string[] = [];
      private player1: Phaser.GameObjects.Image[] = [];
      private player2: Phaser.GameObjects.Image[] = [];
      private isDistributed: boolean = false;

      constructor() {
        super({ key: "CustomCardGameScene" });
      }

      preload() {
        // 카드 이미지 로드 (Deck of Cards API 사용)
        this.load.image(
          "back",
          "https://deckofcardsapi.com/static/img/back.png"
        );
        const suits = ["HEARTS", "DIAMONDS", "CLUBS", "SPADES"];
        const ranks = [
          "A",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "J",
          "Q",
          "K",
        ];

        suits.forEach((suit) => {
          ranks.forEach((rank) => {
            const key = `${rank}${suit[0]}`; // 예: 'AS', '2S', ..., 'KH'
            const url = `https://deckofcardsapi.com/static/img/${key}.png`;
            this.load.image(key, url);
          });
        });
      }

      create() {
        const suits = ["HEARTS", "DIAMONDS", "CLUBS", "SPADES"];
        const ranks = [
          "A",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "J",
          "Q",
          "K",
        ];

        // 전체 카드 키 목록 생성
        this.deck = [];
        suits.forEach((suit) => {
          ranks.forEach((rank) => {
            this.deck.push(`${rank}${suit[0]}`); // 예: 'AS', '2S', ..., 'KH'
          });
        });

        // 카드 섞기
        this.shuffle(this.deck);

        // 카드 객체 생성
        this.cards = this.deck.map((key, index) => {
          const card = this.add.image(150, 100, "back").setScale(0.5);
          card.setInteractive({ draggable: true });
          card.setData("key", key); // 카드의 실제 키 저장
          card.setData("faceUp", false);
          this.input.setDraggable(card);
          return card;
        });

        // 드래그 이벤트 핸들러
        this.input.on(
          "dragstart",
          (
            pointer: Phaser.Input.Pointer,
            gameObject: Phaser.GameObjects.GameObject
          ) => {
            this.children.bringToTop(gameObject);
            (gameObject as Phaser.GameObjects.Image).setTint(0x44ff44);
          }
        );

        this.input.on(
          "drag",
          (
            pointer: Phaser.Input.Pointer,
            gameObject: Phaser.GameObjects.GameObject,
            dragX: number,
            dragY: number
          ) => {
            (gameObject as Phaser.GameObjects.Image).x = dragX;
            (gameObject as Phaser.GameObjects.Image).y = dragY;
          }
        );

        this.input.on(
          "dragend",
          (
            pointer: Phaser.Input.Pointer,
            gameObject: Phaser.GameObjects.GameObject
          ) => {
            (gameObject as Phaser.GameObjects.Image).clearTint();
            this.checkCardPlacement(gameObject);
          }
        );

        // 카드 클릭 이벤트 추가 (카드 뒤집기)
        this.cards.forEach((card) => {
          card.on("pointerdown", () => {
            const isFaceUp = card.getData("faceUp");
            card.setData("faceUp", !isFaceUp);
            card.setTexture(!isFaceUp ? card.getData("key") : "back");
          });
        });
      }

      update() {
        // 게임 업데이트 로직 (필요 시 구현)
      }

      // 카드 섞기 함수 (Fisher-Yates 알고리즘)
      shuffle(array: string[]) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Phaser.Math.Between(0, i);
          [array[i], array[j]] = [array[j], array[i]];
        }
      }

      // 카드 배치 확인 함수 (간단한 예시)
      checkCardPlacement(gameObject: Phaser.GameObjects.GameObject) {
        const card = gameObject as Phaser.GameObjects.Image;
        const snapThreshold = 50;

        // 플레이어 1 영역: 화면 왼쪽 하단
        const player1X = 200;
        const player1Y = 600;

        // 플레이어 2 영역: 화면 오른쪽 하단
        const player2X = 824; // 1024 - 200
        const player2Y = 600;

        // 셔플 영역: 화면 상단 중앙
        const shuffleX = 512;
        const shuffleY = 100;

        // 플레이어 1 영역에 가까운지 확인
        if (
          Phaser.Math.Distance.Between(card.x, card.y, player1X, player1Y) <
          snapThreshold
        ) {
          card.x = player1X;
          card.y = player1Y;
          return;
        }

        // 플레이어 2 영역에 가까운지 확인
        if (
          Phaser.Math.Distance.Between(card.x, card.y, player2X, player2Y) <
          snapThreshold
        ) {
          card.x = player2X;
          card.y = player2Y;
          return;
        }

        // 셔플 영역에 가까운지 확인
        if (
          Phaser.Math.Distance.Between(card.x, card.y, shuffleX, shuffleY) <
          snapThreshold
        ) {
          card.x = shuffleX;
          card.y = shuffleY;
          return;
        }

        // 원래 위치로 돌아감
        card.x = 150;
        card.y = 100;
      }

      // 카드 분배 함수
      distributeCards() {
        if (this.isDistributed) {
          alert("이미 카드를 분배하셨습니다.");
          return;
        }

        if (this.deck.length < 4) {
          alert("카드가 충분하지 않습니다.");
          return;
        }

        // 플레이어 1에게 2장 분배
        for (let i = 0; i < 2; i++) {
          const card = this.cards.pop();
          if (card) {
            this.player1.push(card);
            this.tweens.add({
              targets: card,
              x: 200,
              y: 600,
              duration: 500,
              ease: "Power2",
              onComplete: () => {
                card.setData("faceUp", true);
                card.setTexture(card.getData("key"));
              },
            });
          }
        }

        // 플레이어 2에게 2장 분배
        for (let i = 0; i < 2; i++) {
          const card = this.cards.pop();
          if (card) {
            this.player2.push(card);
            this.tweens.add({
              targets: card,
              x: 824,
              y: 600,
              duration: 500,
              ease: "Power2",
              onComplete: () => {
                card.setData("faceUp", true);
                card.setTexture(card.getData("key"));
              },
            });
          }
        }

        this.isDistributed = true;
      }

      // 카드 셔플 함수
      shuffleCards() {
        // 카드 배열을 다시 섞고 셔플 애니메이션 적용
        this.shuffle(this.deck);

        // 모든 카드를 셔플 영역으로 이동
        this.cards.forEach((card) => {
          this.tweens.add({
            targets: card,
            x: 512,
            y: 100,
            duration: 500,
            ease: "Power2",
            onComplete: () => {
              // 셔플된 후 덱 위치로 다시 이동
              this.tweens.add({
                targets: card,
                x: 150,
                y: 100,
                duration: 500,
                ease: "Power2",
              });
            },
          });
        });

        // 덱 재설정
        this.deck = this.deck.sort(() => Math.random() - 0.5);
      }
    }

    // Phaser 게임 설정
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 1024,
      height: 768,
      backgroundColor: "#006400", // 다크 그린 배경
      parent: gameRef.current || undefined,
      scene: CustomCardGameScene,
    };

    // Phaser 게임 인스턴스 생성
    const game = new Phaser.Game(config);
    const currentScene = game.scene.keys["CustomCardGameScene"];
    sceneRef.current = currentScene;

    // 컴포넌트 언마운트 시 Phaser 게임 파괴
    return () => {
      game.destroy(true);
    };
  }, []);

  // 핸들러 함수
  const handleShuffle = () => {
    if (sceneRef.current) {
      (sceneRef.current as any).shuffleCards();
    }
  };

  const handleDistribute = () => {
    if (sceneRef.current) {
      (sceneRef.current as any).distributeCards();
    }
  };

  return (
    <ChakraProvider>
      <Box
        width="100vw"
        height="100vh"
        bg="green.700"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        <Heading color="white" mb={4}>
          Phaser 새로운 룰 카드 게임
        </Heading>
        <HStack spacing={4} mb={4}>
          <Button colorScheme="teal" onClick={handleShuffle}>
            셔플
          </Button>
          <Button colorScheme="blue" onClick={handleDistribute}>
            분배!
          </Button>
        </HStack>
        <Box
          ref={gameRef}
          width="1024px"
          height="768px"
          border="2px solid white"
          borderRadius="lg"
          boxShadow="lg"
        />
      </Box>
    </ChakraProvider>
  );
};

export default App;
