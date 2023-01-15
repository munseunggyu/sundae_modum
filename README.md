# 순대 모둠

- 배포: [링크](https://munseunggyu.github.io/sundae_modum/)
- 테스트 계정: test@naver.com || 비밀번호 : 123123
- '순대 모둠'은 순천대 기숙사 학생들이 배달 주문 금액의 걱정을 해결하기 위한 게시판입니다.

<br>

## 1. 프로젝트 소개

### [기획의도]

<br />

> 갈수록 늘어가는 배달비로 부담을 느끼는 학생, 기숙사생, 혼밥족을 위한 순천대 전용 배달 커뮤니티 서비스로 배달수수료는 갈수록 오르는 추세를 보이고 있음 혼자사는 사람들, 기숙사에 사는 학생은 최소주문 비용과 배달비를 충족하기 위해 큰 돈을 써야합니다. 이러한 상황을 해결하기 위해 개발하였습니다.

<br />

## 2. 사용 기술

- React
- Redux
- Styled-Components
- Firebase

<br>

## 3. Git 커밋 컨벤션

태그: 설명
|태그|설명|
|---|---|
|Add|새로운 모듈,라이브러리 설치|
|Feat|새로운기능추가|
|Fix|버그 수정|
|Docs|문서 수정|
|Style|css, ui 추가|
|Style Re|css, ui 변경|
|Refactor|코드 리팩토링|
|Comment|주석 추가 및 변경|
|Test|test를 위한 커밋|

## 4. 세부 기능

### 4-1. 홈

<table>
    <tbody>
        <tr></tr>
        <tr>
            <th>시연</th>
            <th>설명</th>
        </tr>
        <tr>
            <td><img src="https://user-images.githubusercontent.com/84954439/212467563-05bb0f27-3368-49b3-830f-c62414ab41c7.gif"
                width="300"    alt=""></td>
            <td>홈/스플래쉬<ul>
                    <li>시작하기 버튼을 통해 서비스에 접속할 수 있습니다.</li>
                    <li>로그인: 메인 게시판으로 이동</li>
                    <li>비로그인: 로그인화면으로 이동</li>
                </ul>
            </td>
        </tr>
        <tr></tr>
        <tr>
            <td><img src="https://user-images.githubusercontent.com/84954439/212467701-f95fa533-5fff-4967-846c-050510dcb0cd.gif"
                width="300"    alt=""></td>
            <td>로그인<ul>
                    <li>유효성 검사를 진행하고, 오류 메시지를 제공합니다. </li>
                    <li>이메일과 비밀번호가 유효한 경우 게시판 화면으로 이동합니다.</li>
                </ul>
            </td>
        </tr>
        <tr></tr>
        <tr>
            <td><img src="https://user-images.githubusercontent.com/84954439/212467860-67bfc5f3-e91e-41f8-93f7-e730de65f4de.gif"
                width="300"    alt=""></td>
            <td>회원가입<ul>
                    <li>사용자의 정보를 입력받아 회원가입을 진행합니다.</li>
                    <li>유효성 검사를 진행하고, 오류 메시지를 전달합니다.</li>
                    <li>이메일과 비밀번호가 유요한 경우 처음 프로필 설정을 위해 프로필 페이지로 이동합니다.</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>
    
<br>

### 4-2. 게시글

<table>
    <tbody>
        <tr></tr>
        <tr>
            <th>시연</th>
            <th>설명</th>
        </tr>
        <tr>
            <td><img src="https://user-images.githubusercontent.com/84954439/212467931-4cd0c3ab-f622-4140-a091-d5a60e07eb96.gif"
                width="300"    alt=""></td>
            <td>게시판<ul>
                    <li>카테고리별로 최신순으로 정렬되어 있습니다.</li>
                    <li>게시글 작성자의 프로필과 게시글 제목 사진이 미리보입니다.</li>
                </ul>
            </td>
        </tr>
        <tr></tr>
        <tr>
            <th>시연</th>
            <th>설명</th>
        </tr>
        <tr>
            <td><img src="https://user-images.githubusercontent.com/84954439/212468182-5d1351d9-889b-422c-908f-319afe41067d.gif"
                 width="300"   alt=""></td>
            <td>업로드<ul>
                    <li>게시글의 모집 마감 기한을 설정합니다.</li>
                    <li>드롭다운 메뉴를 통해 게시글의 카테고리를 설정합니다.</li>
                    <li>첨부파일 선택 버튼을 이용하여 이미지를 업로드할 수 있습니다.</li>
                </ul>
            </td>
        </tr>
        <tr></tr>
        <tr>
            <td><img src="https://user-images.githubusercontent.com/84954439/212468296-1dd9c617-8926-48f8-8a16-8af28d19ce3c.gif"
                 width="300"   alt=""></td>
            <td>게시글<ul>
                    <li>참여하기를 누르면 해당 게시글에 참여한다는 의사를 밝힐 수 있습니다. 참여하기를 한 번 더 누르면 취소가 됩니다.</li>
                    <li>댓글을 작성할 수 있고, 자신이 작성한 댓글에는 하이라이트가 있습니다</li>
                    <li>해당 게시글이 작성자이면 삭제가 가능하고 작성자가 아니면 해당 작성자에게 DM을 보낼 수 있습니다.</li>
                    <li>게시글의 댓글 작성자이면 삭제가 가능하고 댓글 작성자가 아니면 작성자에게 DM을 보낼 수 있습니다.</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>
<br>

### 4-4. 프로필

<table>
    <tbody>
        <tr></tr>
        <tr>
            <th>시연</th>
            <th>설명</th>
        </tr>
        <tr>
            <td><img src="https://user-images.githubusercontent.com/84954439/212468398-782ec884-6f65-4406-a16a-20c11293b512.gif"
                 width="300"   alt=""></td>
            <td>프로필<ul>
                    <li>사용자의 프로필 정보를 제공합니다.</li>
                    <li>작성한 게시글의 목록을 확인할 수 있습니다.</li>
                    <li>로그아웃을 할 수 있으며, 로그인 페이지로 돌아갑니다.</li>
                </ul>
            </td>
        </tr>
        <tr></tr>
        <tr>
            <td><img src="https://user-images.githubusercontent.com/84954439/212468446-7488f20a-9b10-49ff-be54-2f324f90dec1.gif"
                 width="300"   alt=""></td>
            <td>프로필 편집<ul>
                    <li>프로필 이미지를 변경할 수 있습니다.</li>
                    <li>닉네임을 새로 설정 할 수 있습니다.</li>
                    <li>자신을 소개하는 글을 작성 할 수 있습니다.</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

<br>

## 5. 트러블 슈팅

- 문제 상황
  - 파이어베이스에 자기소개라는 정보를 사용자에게 필수로 넣을려고 했으나 파이어베이스 Authentication에 자기소개라는 데이터는 저장이 안된다.
- 원인 추론
  - 파이어베이스에서 회원가입 시 disPlayName, photoURL 만 변경 가능 다른 데이터는 추가 할 수 없다.
- 해결 방법
  - users라는 컬렉션을 추가로 만든 후 회원가입 또는 처음 snsLogin 시 프로필 편집 페이지로 이동 후 disPlayName, photoURL, introduce 정보를 따로 저장해 준다
- 적용 코드

  ```js
  useEffect(() => {
    // 로그인,회원가입,소셜로그인 시 firestore에 해당 유저가 있는지 확인
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        onSnapshot(doc(db, "users", user.uid), async (doc) => {
          // 만약 없다면 첫 프로필 설정 화면으로 이동
          if (!doc.data()) {
            dispatch(firstSetUser(user));
            navigate("/firstedit");
            return;
          }
          // 있다면 바로 홈으로 이동
          dispatch(setUser(doc.data()));
        });
      } else {
        navigate("/");
      }
    });
  }, []);
  ```

## 6. 리팩토링

- 브랜치: [ts](https://github.com/munseunggyu/sundae_modum/tree/ts)
- JavaScript => TypeScript
- Redux => ContextAPI

## 7. 느낀점

매번 클론 코딩이나 강의의 프로젝트를 하다가 처음 혼자하는 제대로 된 프로젝트인데 오류를 꽤 많이 만났다. 오류를 해결하는 과정에서 8시간 걸리는 것도 있었고 하루정도 걸리는 것도 있었다. 오류를 해결하는데 너무 오래걸리는건 안좋긴하지만 처음 하는 프로젝트인 만큼 혼자 해결하면서 계속 고민하며 많이 성장하게 된 것 같다 깨달은 점은 오류가 해결이 되지 않으면 아예 다른방향으로 생각하는 것도 오류의 해결 방법이라는 것을 알게되었다.
