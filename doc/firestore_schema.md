# SILK Firestore 데이터 스키마

> 마지막 업데이트: 2025-08-13  
> 담당자: 김우진 (데이터 관리자)

---

## 1. users (사용자 정보)

| 항목 | 설명 | 타입 | 예시 |
|------|------|------|------|
| 문서 ID | 사용자 UID (`auth.uid`) | string | `Gjd82kfSXYZ` |
| email | 이메일 | string | `test1@gmail.com` |
| nickname | 닉네임 | string | `감정요정` |
| avatarUrl | 프로필 이미지 (선택) | string | `https://...` |
| joinedAt | 가입일 | timestamp | `2025-08-01T12:00:00Z` |

---

## 2. silks (감정 카드)

| 항목 | 설명 | 타입 | 예시 |
|------|------|------|------|
| 문서 ID | 자동 생성 ID | string | `3ErNaYtfq...` |
| userId | 작성자 UID | string | `Gjd82kfSXYZ` |
| color | 색상 HEX | string | `#FF66CC` |
| shape | 도형 코드 (AI 입력용) | string | `shape_1` |
| sound | 사운드 코드 (AI 입력용) | string | `sound_2` |
| emotionLabel | AI 분석 감정 | string | `joy` |
| timestamp | 작성 시각 | timestamp | `2025-08-13T13:45:00Z` |
| location.lat | 위도 | number | `37.123456` |
| location.lng | 경도 | number | `127.456789` |

---

## 3. likes (공감 데이터)

| 항목 | 설명 | 타입 | 예시 |
|------|------|------|------|
| 문서 ID | 감정 카드 ID (`silkId`) | string | `3ErNaYtfq...` |
| likedBy | 공감한 UID 리스트 | array(string) | `["uid1", "uid2"]` |

---

## 4. mapFeed (지도 마커)

| 항목 | 설명 | 타입 | 예시 |
|------|------|------|------|
| 문서 ID | 사용자 UID | string | `Gjd82kfSXYZ` |
| color | 색상 | string | `#00CCFF` |
| shape | 도형 코드 | string | `shape_2` |
| emotionLabel | AI 감정 결과 | string | `anger` |
| lat | 위도 | number | `37.5` |
| lng | 경도 | number | `126.9` |
| timestamp | 등록 시각 | timestamp | `2025-08-13T14:00:00Z` |

---

## 규칙 요약 (보안)

- `users`는 본인만 읽고/쓰기 가능
- `silks`는 모두 읽을 수 있으나, 본인만 작성/수정 가능
- `likes`는 로그인한 사용자만 추가 가능
- `mapFeed`는 본인만 쓰고, 모두 읽을 수 있음

---