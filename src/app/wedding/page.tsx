"use client";
import React, { useState } from "react";
import "../../styles/wedding/layout.css"; // Assuming you have corresponding CSS
import "../../styles/wedding/common.css"; // Assuming you have corresponding CSS
import { Image } from "@chakra-ui/react";

const WeddingPage: React.FC = () => {
  // State hooks for managing pop-ups and other interactive elements
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentGalleryType, setCurrentGalleryType] = useState<string | null>(
    null
  );
  const [isMessageDeleteOpen, setIsMessageDeleteOpen] = useState(false);
  const [isAccountCopyGOpen, setIsAccountCopyGOpen] = useState(false);
  const [isAccountCopyBOpen, setIsAccountCopyBOpen] = useState(false);
  const [isCopyCompleteOpen, setIsCopyCompleteOpen] = useState(false);
  const [isSendRsvpOpen, setIsSendRsvpOpen] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);

  // Placeholder functions - Implement these as needed
  /*   const musicPlayer = () => {
    // Implement music play/pause functionality
    setIsMusicPlaying(!isMusicPlaying);
    const audio = document.getElementById("audio") as HTMLAudioElement;
    const img = document.getElementById("m_on") as HTMLImageElement;
    const p = document.getElementById("m_off") as HTMLElement;
    if (isMusicPlaying) {
      audio.pause();
      img.src = "/mobile/new_m/mcard/images/common/music_01_off.png";
      p.style.display = "block";
    } else {
      audio.play();
      img.src = "/mobile/new_m/mcard/images/common/music_01_on.png";
      p.style.display = "none";
    }
  };
 */
  const pcAlert = () => {
    alert("This feature is not available on PC.");
  };

  const galleryPOP = (action: string, type: string) => {
    if (action === "open") {
      setCurrentGalleryType(type);
      setIsGalleryOpen(true);
    } else {
      setIsGalleryOpen(false);
      setCurrentGalleryType(null);
    }
  };

  const popOpen = (padding: string, popName: string) => {
    switch (popName) {
      case "messageDelete":
        setIsMessageDeleteOpen(true);
        break;
      case "accountCopyG":
        setIsAccountCopyGOpen(true);
        break;
      case "accountCopyB":
        setIsAccountCopyBOpen(true);
        break;
      default:
        break;
    }
  };

  const popClose = (popName: string) => {
    switch (popName) {
      case "messageDelete":
        setIsMessageDeleteOpen(false);
        break;
      case "accountCopyG":
        setIsAccountCopyGOpen(false);
        break;
      case "accountCopyB":
        setIsAccountCopyBOpen(false);
        break;
      case "copyComplete":
        setIsCopyCompleteOpen(false);
        break;
      case "sendRsvp":
        setIsSendRsvpOpen(false);
        break;
      case "openRsvpCon":
        setIsRsvpOpen(false);
        break;
      default:
        break;
    }
  };

  const popRsvp = (action: string) => {
    if (action === "open") {
      setIsRsvpOpen(true);
    } else {
      setIsRsvpOpen(false);
    }
  };

  const handleCopy = (accountNumber: string, popName: string) => {
    navigator.clipboard
      .writeText(accountNumber)
      .then(() => {
        setIsCopyCompleteOpen(true);
        popClose(popName);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  const goPrePage = () => {
    // Implement pagination logic
    console.log("Go to previous page");
  };

  const goNextPage = () => {
    // Implement pagination logic
    console.log("Go to next page");
  };

  return (
    <div className="mcard_29" style={{ minWidth: "100%" }}>
      <div className="wrapper">
        <section id="content">
          {/* Player */}
          {/* <div className="music">
          <a href="#!" onClick={musicPlayer}>
            <div>
              <img
                id="m_on"
                src="/mobile/new_m/mcard/images/common/music_01_off.png"
                alt="Music Player"
              />
              <p style={{ display: "none" }} id="m_off">
                stop
              </p>
            </div>
          </a>
          <audio id="audio" preload="none" loop src="/music/bgm1.mp3"></audio>
          <iframe
            id="ie_player"
            src="/script/order/bgm.asp?bgm=/music/bgm1.mp3"
            width="0"
            height="0"
            title="Music Player"
          ></iframe>
        </div> */}
          {/* // Player */}

          {/* Visual Section */}
          <section className="visual-section h-100">
            <div className="vertical-center">
              <div className="vertical-item date">
                <p className="date">10월 26일</p>
              </div>
              <div className="vertical-item photo">
                <Image src="/images/wedding/DSC08202.jpg" alt="Visual" />
              </div>
              <div className="vertical-item info">
                <p className="p1">
                  <span className="vs-span">장기훈</span>
                  <span className="vs-span bar">/</span>
                  <span className="vs-span">이정인</span>
                </p>
                <p className="p2">
                  토요일 오후 1시 30분
                  <br />
                  잇츠카드 웨딩홀 6층 노블레스홀
                </p>
              </div>
            </div>
          </section>
          {/* // Visual Section */}

          {/* Greeting Section */}
          <section className="greeting-section">
            <div className="sec-tit">이제 서로, 평생 함께</div>
            <div className="sec-txt">
              서로가 마주보며 다져온 사랑을 이제 함께 한 곳을 바라보며 걸어갈 수
              있는 큰 사랑으로 키우고자 합니다. 저희 두 사람이 사랑의 이름으로
              지켜나갈 수 있도록 앞날을 축복해 주시면 감사하겠습니다.
            </div>
            <div className="info">
              <div className="ib">
                <div className="tb">
                  <div className="row">
                    <p className="honju">
                      <span className="gt-span">이석훈</span>
                      <span className="gt-span bul"></span>
                      <span className="gt-span">이미자</span>
                    </p>
                    <p className="default">의</p>
                    <p className="gwangye">장남</p>
                    <p className="slsb">지훈</p>
                  </div>
                  <div className="row">
                    <p className="honju">
                      <span className="gt-span">유성령</span>
                      <span className="gt-span bul"></span>
                      <span className="gt-span">박효순</span>
                    </p>
                    <p className="default">의</p>
                    <p className="gwangye">장녀</p>
                    <p className="slsb">수진</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* // Greeting Section */}

          {/* Banner Section */}
          <section className="banner-section">
            <div className="tb">
              <p className="txt">
                소 중 한 &nbsp; 당 신 을 &nbsp; 초 대 합 니 다
              </p>
            </div>
          </section>
          {/* // Banner Section */}

          {/* Contact to Groom and Bride */}
          <section className="slsbTel-section">
            <div className="ib">
              <div className="row">
                <div className="slsb-tit">신랑에게 연락하기</div>
                <div className="slsb-btn">
                  <a href="#!" onClick={pcAlert} className="com-btn tel sl">
                    연락하기
                  </a>
                  <a href="#!" onClick={pcAlert} className="com-btn sms">
                    문자보내기
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="slsb-tit">신부에게 연락하기</div>
                <div className="slsb-btn">
                  <a href="#!" onClick={pcAlert} className="com-btn tel sb">
                    연락하기
                  </a>
                  <a href="#!" onClick={pcAlert} className="com-btn sms">
                    문자보내기
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* // Contact to Groom and Bride */}

          {/* Contact to Parents */}
          <section className="honjuTel-section">
            <div className="tit">혼주에게 연락하기</div>
            <div className="con">
              <div className="col">
                <div className="honju-tit sl">신랑 측 혼주</div>
                <div className="box first">
                  <div className="name">
                    <span>아버지</span> <strong>이석훈</strong>
                  </div>
                  <div className="honju-btn">
                    <a href="#!" onClick={pcAlert} className="com-btn tel sl">
                      연락하기
                    </a>
                    <a href="#!" onClick={pcAlert} className="com-btn sms">
                      문자보내기
                    </a>
                  </div>
                </div>
                <div className="box">
                  <div className="name">
                    <span>어머니</span> <strong>이미자</strong>
                  </div>
                  <div className="honju-btn">
                    <a href="#!" onClick={pcAlert} className="com-btn tel sl">
                      연락하기
                    </a>
                    <a href="#!" onClick={pcAlert} className="com-btn sms">
                      문자보내기
                    </a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="honju-tit sb">신부 측 혼주</div>
                <div className="box first">
                  <div className="name">
                    <span>아버지</span> <strong>유성령</strong>
                  </div>
                  <div className="honju-btn">
                    <a href="#!" onClick={pcAlert} className="com-btn tel sb">
                      연락하기
                    </a>
                    <a href="#!" onClick={pcAlert} className="com-btn sms">
                      문자보내기
                    </a>
                  </div>
                </div>
                <div className="box">
                  <div className="name">
                    <span>어머니</span> <strong>박효순</strong>
                  </div>
                  <div className="honju-btn">
                    <a href="#!" onClick={pcAlert} className="com-btn tel sb">
                      연락하기
                    </a>
                    <a href="#!" onClick={pcAlert} className="com-btn sms">
                      문자보내기
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* // Contact to Parents */}

          {/* Calendar Section */}
          <section className="calendar-section">
            <div className="calendar-wrap">
              <div id="calendar"></div>
              <div className="day-time">
                <span className="day">sat.</span>{" "}
                <span className="time">pm 1:30</span>
              </div>
            </div>
          </section>
          {/* // Calendar Section */}

          {/* Gallery Section */}
          <section className="gallery-section">
            <div className="sec-tit">갤러리</div>
            <div className="contain">
              <ul
                id="image-gallery"
                className="gallery list-unstyled cS-hidden roll_type01"
              >
                {/* Repeat for each gallery item */}
                {[...Array(12)].map((_, index) => (
                  <li
                    key={index}
                    data-thumb={`/mobile/new_m/mcard/images/common/gallery_sample_0${
                      index + 1
                    }.jpg?v=0.0.1`}
                    onClick={() => galleryPOP("open", "type1")}
                  >
                    <div className="box">
                      <div className="pos">
                        <div className="cen">
                          <img
                            src={`/mobile/new_m/mcard/images/common/gallery_sample_0${
                              index + 1
                            }.jpg?v=0.0.1`}
                            alt={`Gallery ${index + 1}`}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="ex">이미지를 클릭하시면 확대보기가 가능합니다.</p>
            </div>
          </section>
          {/* // Gallery Section */}

          {/* Video Section */}
          <section className="video-section">
            <div className="sec-tit">영상보기</div>
            <div className="video">
              <iframe
                src="https://player.vimeo.com/video/199757327"
                allowFullScreen
                id="videoarea"
                data-ready="true"
                title="Wedding Video"
              ></iframe>
            </div>
          </section>
          {/* // Video Section */}

          {/* Text Banner Section */}
          <section className="tbanner-section">
            <div className="text vertical">
              <div className="ib">
                <span className="vt">
                  예쁘게<span className="space">잘</span>살겠습니다
                </span>
              </div>
            </div>
          </section>
          {/* // Text Banner Section */}

          {/* Live Wedding Information */}
          <section className="livewed-section">
            <div className="sec-tit">라이브 웨딩 안내</div>
            <div className="sec-txt">
              참석이 어려운 분들께서는
              <br />
              온라인 중계로 시청하실 수 있습니다.
            </div>
            <div className="sec-date">10월 26일 오후 1시 30분</div>
            <div className="button">
              <a href="#!" onClick={pcAlert}>
                라이브 웨딩 보러가기
              </a>
            </div>
          </section>
          {/* // Live Wedding Information */}

          {/* Location Section */}
          <section className="location-section">
            <div className="sec-tit">오시는길</div>
            <div className="map-area">
              <div className="head">
                <div className="tit">잇츠카드 웨딩홀 6층 노블레스홀</div>
                <div className="txt">
                  <p>서울특별시 강남구 논현로 742</p>
                  <p>Tel. 02-1234-5678</p>
                </div>
                <a href="#!" onClick={pcAlert} className="tel">
                  전화걸기
                </a>
              </div>
              <div id="map_canvas" className="map">
                <div
                  style={{
                    font: "normal normal 400 12px/normal dotum, sans-serif",
                    width: "100%",
                    height: "100%",
                    color: "#333",
                    position: "relative",
                  }}
                >
                  <div style={{ height: "100%" }}>
                    <a
                      href="https://map.kakao.com/?urlX=510720.0&amp;urlY=1124069.0&amp;itemId=26497843&amp;q=%EC%84%9C%EC%9A%B8%EC%88%B2A%ED%83%80%EC%9B%8C&amp;srcid=26497843&amp;map_type=TYPE_MAP&amp;from=roughmap"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="map"
                        src="//t1.daumcdn.net/roughmap/imgmap/e4a136bdc0a737dd8c6a0812eebdb5fa1bfe55660e458c000633c51c83b13def"
                        width="100%"
                        height="100%"
                        alt="Map"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="link">
                <ul>
                  <li>
                    <a href="#!" onClick={pcAlert} className="tmap">
                      티맵
                    </a>
                  </li>
                  <li>
                    <a href="#!" onClick={pcAlert} className="kakaonavi">
                      카카오내비
                    </a>
                  </li>
                  <li>
                    <a href="#!" onClick={pcAlert} className="navermap">
                      네이버지도
                    </a>
                  </li>
                  <li>
                    <a href="#!" onClick={pcAlert} className="kakaomap">
                      카카오맵
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/*<div className="map-img">
            <img src="/mobile/new_m/mcard/images/map/map_01.jpg" alt="">
          </div>*/}
            <div className="info">
              <div className="contain">
                <dl>
                  <dt>지하철안내</dt>
                  <dd>7호선 학동역 8번출구 도보 10분 거리</dd>
                </dl>
                <dl>
                  <dt>버스안내</dt>
                  <dd>간선버스 : 47, 240, 463</dd>
                  <dd>지선버스 : 4211</dd>
                  <dd>마을버스 : 강남08</dd>
                </dl>
                <dl>
                  <dt>주차안내</dt>
                  <dd>웨딩홀 전방 우측 150m 사이 공용주차장 이용</dd>
                </dl>
              </div>
            </div>
            <div className="info">
              <div className="contain">
                <dl>
                  <dt>전세버스안내</dt>
                  <dd>예식당일 오전 11시 / 동대입구 전철역 1번출구 앞 출발</dd>
                </dl>
                <dl>
                  <dt>계좌번호안내</dt>
                  <dd>농협 123-456788-7654321 예금주 : 이지훈</dd>
                </dl>
                <dl>
                  <dt>기타안내</dt>
                  <dd>화환은 정중히 사양합니다.</dd>
                </dl>
              </div>
            </div>
          </section>
          {/* // Location Section */}

          {/* Account Section */}
          <section className="account-section">
            <div className="sec-tit">신랑신부에게 마음 전하기</div>
            <div className="sec-txt">
              축하의 마음을 담아 축의금을 전달해보세요.
            </div>
            <div className="ib">
              <div className="row">
                <div className="slsb-tit">신랑측 마음</div>
                <div className="slsb-btn">
                  <a
                    href="#!"
                    onClick={() => popOpen("0 1rem", "accountCopyG")}
                    className="com-btn acc sl"
                  >
                    계좌번호 보기
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="slsb-tit">신부측 마음</div>
                <div className="slsb-btn">
                  <a
                    href="#!"
                    onClick={() => popOpen("0 1rem", "accountCopyB")}
                    className="com-btn acc sb"
                  >
                    계좌번호 보기
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* // Account Section */}

          {/* RSVP Section */}
          <section className="livewed-section rsvp-section">
            <div className="sec-tit">참석 여부 전달</div>
            <div className="sec-txt">
              축하의 마음으로 참석해주시는 한 분 한 분 귀한 마음으로 모실 수
              있도록 부담없이 알려주시면 정성을 다해 준비하겠습니다.
            </div>
            <div className="sec-date"></div>
            <div className="button">
              <a href="#!" onClick={() => popRsvp("open")}>
                참석 의사 전달하기
              </a>
            </div>
          </section>
          {/* // RSVP Section */}

          {/* Message Section */}
          <section className="message-section">
            <div className="sec-tit">메시지</div>
            <div className="sec-txt">축하 메시지를 남겨주세요.</div>

            <div className="form">
              <form action="">
                <div className="group col-2 first">
                  <div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="input"
                      placeholder="이름"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      name="ipwd"
                      id="ipwd"
                      className="input"
                      placeholder="비밀번호"
                    />
                  </div>
                </div>
                <div className="group">
                  <div>
                    <textarea name="" id="" className="textarea"></textarea>
                  </div>
                </div>
                <div className="buttons">
                  <button type="button" className="btn submit">
                    등록하기
                  </button>
                </div>
              </form>
            </div>

            <div className="comment">
              <ul className="comment-list">
                {/* Example comments - you may want to map these from state or props */}
                <li className="list">
                  <div className="tit">
                    <span className="name">홍진경</span>
                    <span className="date">2022.01.01.13:13:10</span>
                  </div>
                  <p className="txt">결혼축하해~결혼식에서 보자!!ㅎㅎ</p>
                  <a
                    href="#!"
                    className="delete-btn"
                    onClick={() => popOpen("0 1rem", "messageDelete")}
                  >
                    댓글삭제
                  </a>
                </li>
                <li className="list">
                  <div className="tit">
                    <span className="name">이진아</span>
                    <span className="date">2022.01.01.13:13:10</span>
                  </div>
                  <p className="txt">사진 너무 예쁘다! 행복하게 살아야해 :)</p>
                  <a
                    href="#!"
                    className="delete-btn"
                    onClick={() => popOpen("0 1rem", "messageDelete")}
                  >
                    댓글삭제
                  </a>
                </li>
                <li className="list">
                  <div className="tit">
                    <span className="name">이이경</span>
                    <span className="date">2022.01.01.13:13:10</span>
                  </div>
                  <p className="txt">축의금은 미리 보내요^^</p>
                  <a
                    href="#!"
                    className="delete-btn"
                    onClick={() => popOpen("0 1rem", "messageDelete")}
                  >
                    댓글삭제
                  </a>
                </li>
              </ul>
            </div>

            <div className="paging">
              <a href="#!" className="prev" onClick={goPrePage}>
                &lt;
              </a>
              <a href="#!" className="on">
                1
              </a>
              <a href="#!">2</a>
              <a href="#!">3</a>
              <a href="#!">4</a>
              <a href="#!">5</a>
              <a href="#!" className="next" onClick={goNextPage}>
                &gt;
              </a>
            </div>
          </section>
          {/* // Message Section */}
        </section>

        {/* Footer */}
        <footer id="footer">
          <div className="foot-share">
            <ul className="foot-share-list">
              <li>
                <a href="#!" onClick={pcAlert} className="kakao">
                  카카오톡
                  <br /> 공유하기
                </a>
              </li>
              <li>
                <a href="#!" onClick={pcAlert} className="facebook">
                  페이스북
                  <br /> 공유하기
                </a>
              </li>
            </ul>
          </div>
          <div className="foot-logo">it`s card</div>
        </footer>
        {/* // Footer */}

        {/* Gallery Pop-up */}
        {isGalleryOpen && (
          <div className="gallery-pop-wrap">
            <div className="pop-header">
              <div className="tit">갤러리</div>
            </div>
            <div className="pop-body">
              <ul
                id="pop-gallery"
                className="gallery list-unstyled cS-hidden roll_type01"
              >
                {[...Array(12)].map((_, index) => (
                  <li
                    key={index}
                    data-thumb={`/mobile/new_m/mcard/images/common/gallery_sample_0${
                      index + 1
                    }.jpg?v=0.0.1`}
                  >
                    <div className="box">
                      <div className="pos">
                        <div className="cen">
                          <img
                            src={`/mobile/new_m/mcard/images/common/gallery_sample_0${
                              index + 1
                            }.jpg?v=0.0.1`}
                            alt={`Gallery Pop ${index + 1}`}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="close-btn"
              onClick={() => galleryPOP("close", "type1")}
            >
              닫기
            </button>
          </div>
        )}

        {/* Message Delete Pop-up */}
        {isMessageDeleteOpen && (
          <div className="pop-wrap messageDelete" id="messageDelete">
            <div className="pop-inner">
              <div className="pop-head">방명록 삭제</div>
              <div className="pop-body">
                <div className="form">
                  <form action="">
                    <div className="con">
                      <div className="group">
                        <div>
                          <input
                            type="password"
                            name="pwd"
                            id="pwd"
                            className="input"
                            placeholder="password"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="buttons">
                      <a
                        href="#!"
                        className="btn"
                        onClick={() => popClose("messageDelete")}
                      >
                        취소
                      </a>
                      <button type="button" className="btn">
                        확인
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <button
                className="close-btn"
                onClick={() => popClose("messageDelete")}
              >
                닫기
              </button>
            </div>
          </div>
        )}

        {/* Account Copy Pop-ups */}
        {isAccountCopyGOpen && (
          <div className="pop-wrap accountCopy" id="accountCopyG">
            <div className="pop-inner">
              <div className="pop-head">신랑측 계좌번호</div>
              <div className="pop-body">
                <div className="form">
                  <form action="">
                    <div className="group col-2 first">
                      <div>국민은행</div>
                      <div>
                        <span>예금주 : </span> 이석훈
                      </div>
                    </div>
                    <div className="group">
                      <div>
                        <input
                          name="GBankNum1"
                          id="GBankNum1"
                          className="input"
                          readOnly
                          value="000-123-456789"
                        />
                        <button
                          type="button"
                          className="btn"
                          onClick={() =>
                            handleCopy("000-123-456789", "accountCopyG")
                          }
                        >
                          복사
                        </button>
                      </div>
                    </div>
                    <div className="group col-2">
                      <div>국민은행</div>
                      <div>
                        <span>예금주 : </span> 이석훈
                      </div>
                    </div>
                    <div className="group">
                      <div>
                        <input
                          name="GBankNum2"
                          id="GBankNum2"
                          className="input"
                          readOnly
                          value="000-123-456789"
                        />
                        <button
                          type="button"
                          className="btn"
                          onClick={() =>
                            handleCopy("000-123-456789", "accountCopyG")
                          }
                        >
                          복사
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <button
                className="close-btn"
                onClick={() => popClose("accountCopyG")}
              >
                닫기
              </button>
            </div>
          </div>
        )}

        {isAccountCopyBOpen && (
          <div className="pop-wrap accountCopy" id="accountCopyB">
            <div className="pop-inner">
              <div className="pop-head">신부측 계좌번호</div>
              <div className="pop-body">
                <div className="form">
                  <form action="">
                    <div className="group col-2 first">
                      <div>국민은행</div>
                      <div>
                        <span>예금주 : </span> 이석훈
                      </div>
                    </div>
                    <div className="group">
                      <div>
                        <input
                          name="BBankNum1"
                          id="BBankNum1"
                          className="input"
                          readOnly
                          value="000-123-456789"
                        />
                        <button
                          type="button"
                          className="btn"
                          onClick={() =>
                            handleCopy("000-123-456789", "accountCopyB")
                          }
                        >
                          복사
                        </button>
                      </div>
                    </div>
                    <div className="group col-2">
                      <div>국민은행</div>
                      <div>
                        <span>예금주 : </span> 이석훈
                      </div>
                    </div>
                    <div className="group">
                      <div>
                        <input
                          name="BBankNum2"
                          id="BBankNum2"
                          className="input"
                          readOnly
                          value="000-123-456789"
                        />
                        <button
                          type="button"
                          className="btn"
                          onClick={() =>
                            handleCopy("000-123-456789", "accountCopyB")
                          }
                        >
                          복사
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <button
                className="close-btn"
                onClick={() => popClose("accountCopyB")}
              >
                닫기
              </button>
            </div>
          </div>
        )}

        {/* Copy Complete Pop-up */}
        {isCopyCompleteOpen && (
          <div className="pop-wrap copyComplete" id="copyComplete">
            <div className="pop-inner">
              <div className="pop-body">
                <div className="form">
                  <form action="">
                    <div className="con">
                      <div className="group">
                        <div className="tit">계좌번호가 복사되었습니다.</div>
                        <div className="bkinfo">
                          <span>국민은행 000-123-456789</span>
                          <br />
                          <span>예금주 이석훈</span>
                        </div>
                      </div>
                    </div>
                    <div className="buttons">
                      <a
                        href="#!"
                        className="btn"
                        onClick={() => popClose("copyComplete")}
                      >
                        확인
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Send RSVP Pop-up */}
        {isSendRsvpOpen && (
          <div className="pop-wrap copyComplete sendRsvp" id="sendRsvp">
            <div className="pop-inner">
              <div className="pop-body">
                <div className="form">
                  <form action="">
                    <div className="con">
                      <div className="group group-narrow">
                        <div>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={() => popClose("sendRsvp")}
                          ></button>
                          <div className="tit">참석 여부를 말씀해 주세요</div>
                          <div className="default-txt">
                            축하의 마음으로 참석해 주시는
                            <br />
                            한 분 한 분 감사한 마음으로 모실 수 있도록
                            <br />
                            참석 여부 전달 부탁드립니다.
                          </div>
                          <div className="customer-txt">
                            <p className="name">
                              <span className="gender gender-m">
                                <span className="male">신랑</span>
                                <span className="nm">이지훈</span>
                              </span>{" "}
                              ♥{" "}
                              <span className="gender gender-f">
                                <span className="female">신부</span>
                                <span className="nm">유수진</span>
                              </span>
                            </p>
                            <p className="date">2023. 10. 29. 1 : 30(PM)</p>
                            <p className="place">
                              잇츠카드 웨딩홀 6층 노블레스홀
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="buttons">
                      <a
                        href="#!"
                        className="btn btn-purple"
                        onClick={() => {
                          popRsvp("open");
                          popClose("sendRsvp");
                        }}
                      >
                        참석 여부 전달하기
                      </a>
                    </div>
                    <div className="notToday">
                      <div className="check-wrap">
                        <input
                          type="checkbox"
                          value="1"
                          id="todayNotOpen"
                          onClick={() => popClose("sendRsvp")}
                        />
                        <label
                          htmlFor="todayNotOpen"
                          className="basic-checkbox"
                        >
                          <span className="label-text wht">
                            오늘 하루 열지 않기
                          </span>
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RSVP Pop-up */}
        {isRsvpOpen && (
          <div className="bg-full-wrap" id="openRsvpCon">
            <div className="pop-full-wrap copyComplete openRsvpcon">
              <div className="pop-inner">
                <div className="pop-body">
                  <div className="form">
                    <div className="con">
                      <div className="group group-narrow">
                        <div className="tit tit1">
                          참석 여부 전달하기
                          <button
                            type="button"
                            className="btn-close"
                            onClick={() => popRsvp("close")}
                          ></button>
                        </div>
                        <section className="con-wrap">
                          <div className="row-wrap row-wrap-1">
                            <div className="inner">
                              <div className="item">
                                <div className="check_box">
                                  <input
                                    type="radio"
                                    id="request_chk1"
                                    name="couple"
                                  />
                                  <label
                                    htmlFor="request_chk1"
                                    className="sec-item-icon sec-item-icon1"
                                  >
                                    <span className="chk-txt">
                                      <span className="icon groom"></span>신랑측
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="item">
                                <div className="check_box">
                                  <input
                                    type="radio"
                                    id="request_chk2"
                                    name="couple"
                                  />
                                  <label
                                    htmlFor="request_chk2"
                                    className="sec-item-icon sec-item-icon1"
                                  >
                                    <span className="chk-txt">
                                      <span className="icon bride"></span>신부측
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row-wrap row-wrap-2">
                            <p className="item-ttl">
                              참석 여부를 선택해 주세요
                            </p>
                            <div className="inner">
                              <div className="item">
                                <div className="check_box">
                                  <input
                                    type="radio"
                                    id="request_chk3"
                                    name="attend"
                                  />
                                  <label
                                    htmlFor="request_chk3"
                                    className="sec-item-icon sec-item-icon1"
                                  >
                                    <span className="chk-txt">참석 불가</span>
                                  </label>
                                </div>
                              </div>
                              <div className="item">
                                <div className="check_box">
                                  <input
                                    type="radio"
                                    id="request_chk4"
                                    name="attend"
                                  />
                                  <label
                                    htmlFor="request_chk4"
                                    className="sec-item-icon sec-item-icon1"
                                  >
                                    <span className="chk-txt">참석 가능</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row-wrap row-wrap-3">
                            <p className="item-ttl">
                              성함<span className="point">(필수)</span>
                            </p>
                            <div className="inner">
                              <div className="item w100p">
                                <input type="text" />
                              </div>
                            </div>
                          </div>
                          <div className="row-wrap row-wrap-3">
                            <p className="item-ttl">
                              대표 연락처<span className="point">(필수)</span>
                            </p>
                            <div className="inner">
                              <div className="item w100p">
                                <input type="text" />
                              </div>
                            </div>
                          </div>
                          <div className="row-wrap row-wrap-4">
                            <p className="item-ttl">
                              동행인원<span className="point">(필수)</span>
                            </p>
                            <div className="inner">
                              <div className="item w100p">
                                <input
                                  type="text"
                                  placeholder="본인 포함 총 인원"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row-wrap row-wrap-5">
                            <p className="item-ttl">
                              식사 여부<span className="point">(필수)</span>
                            </p>
                            <div className="inner">
                              <div className="item">
                                <div className="check_box">
                                  <input
                                    type="radio"
                                    id="request_chk7"
                                    name="meal"
                                  />
                                  <label
                                    htmlFor="request_chk7"
                                    className="sec-item-icon sec-item-icon1"
                                  >
                                    <span className="chk-txt">식사 가능</span>
                                  </label>
                                </div>
                              </div>
                              <div className="item">
                                <div className="check_box">
                                  <input
                                    type="radio"
                                    id="request_chk8"
                                    name="meal"
                                  />
                                  <label
                                    htmlFor="request_chk8"
                                    className="sec-item-icon sec-item-icon1"
                                  >
                                    <span className="chk-txt">
                                      식사 불가
                                      <span className="sm-txt">
                                        (답례품 수령)
                                      </span>
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row-wrap row-wrap-6">
                            <p className="item-ttl">추가 전달 사항</p>
                            <div className="inner">
                              <textarea placeholder="추가적으로 주최자에게 전달하고 싶은 내용을 작성해 주세요."></textarea>
                            </div>
                          </div>
                          <div className="row-wrap personal-info">
                            <p className="item-ttl">
                              개인정보 수집 및 이용 동의
                              <span className="point">(필수)</span>
                            </p>
                            <p className="info-txt">
                              참석여부 전달을 위한 개인정보 수집 및 이용에
                              동의해 주세요.
                              <br />
                              · 제공 받는 자 : 모바일 청첩장 주문자 (신랑,
                              신부측)
                              <br />
                              · 이용 목적 : 행사 참석여부 확인
                              <br />
                              · 제공 항목 : 성함, 대표 연락처, 동행인원,
                              식사여부 중 제공받는 정보에 한함
                              <br />
                              · 보유 기간 : 모바일 청첩장 만료시까지
                              <br />* 개인정보 수집 및 이용에 대한 동의를 거부할
                              권리가 있으며, 동의 거부 시 참석여부 서비스 이용이
                              불가합니다.
                            </p>
                            <div className="check-wrap">
                              <input
                                type="checkbox"
                                value="1"
                                id="personalInfoAgree"
                              />
                              <label
                                htmlFor="personalInfoAgree"
                                className="basic-checkbox"
                              >
                                <span className="label-text">
                                  수집 및 이용에 동의합니다.
                                </span>
                              </label>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                  <div className="buttons">
                    <a
                      href="#!"
                      className="btn btn-purple"
                      onClick={() => {
                        /* Implement RSVP submission */
                      }}
                    >
                      참석 여부 전달하기
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Share Pop-ups and Others can be added similarly */}
    </div>
  );
};

export default WeddingPage;
