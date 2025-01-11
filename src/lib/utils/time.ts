export function timeAgo(inputTime: string): string {
  const currentTime = new Date(); // 현재 시간
  const pastTime = new Date(inputTime); // 입력받은 시간
  const diffMs = currentTime.getTime() - pastTime.getTime(); // 시간 차이 (밀리초)
  const diffMinutes = Math.floor(diffMs / 1000 / 60); // 분 단위로 변환
  const diffHours = Math.floor(diffMinutes / 60); // 시간 단위로 변환
  const diffDays = Math.floor(diffHours / 24); // 일 단위로 변환

  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`; // 1시간 이내
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`; // 1시간 이상, 24시간 이내
  } else {
    return `${diffDays}일 전`; // 24시간 이상
  }
}
