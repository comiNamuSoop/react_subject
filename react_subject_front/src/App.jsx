import { useEffect, useState } from "react";
import styles from "./App.module.css";
import axios from "axios";
function App() {
  const [list, setList] = useState([]);

  const [category, setCategory] = useState(0);
  /* category : 카테고리 필터
    0 : All(기본값)   1:백엔드  2:프론트엔드  3:DB
  */
  const [level, setLevel] = useState(0);
  /* level : 난이도 필터
    0 : All(기본값) 1:초급  2:중급  3.고급
  */

  const [order, setOrder] = useState(0);
  /* order : 정렬
    0 : 작성순 (기본값)
    1 : 난이도 오름차순
    2 : 난이도 내림차순
    3 : 수강인원 오름차순
    4 : 수강인원 내림차순
  */

  const [keyword, setKeyword] = useState("");
  /* 화면표현용 스테이트 */

  const [searchKeyword, setSearchKeyword] = useState("");
  /* 서버전송용 스테이트 */

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKSERVER}/subjects?category=${category}&level=${level}&order=${order}&searchKeyword=${searchKeyword}`,
      )
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log("서버에 연결할수 없습니다");
      });
  }, [category, level, order, searchKeyword]);
  return (
    <>
      <header className={styles.header}>
        <h1>강의 목록</h1>
        <ul className={styles.list_wrap}>
          <li className={styles.list_no}>강의번호</li>
          <li className={styles.list_title} style={{ textAlign: "center" }}>
            강의제목
          </li>
          <li className={styles.list_instructor}>담당강사</li>
          <li className={styles.list_category}>과목분류</li>
          <li className={styles.list_level}>난이도</li>
          <li className={styles.list_count}>수강정원 </li>
        </ul>
        {list.map((subject) => {
          return (
            <SubjectItem
              key={`subject-list-${subject.subjectNo}`}
              subject={subject}
            />
          );
        })}
      </header>
      <div className={styles.input_wrap}>
        <form
          onSubmit={(e) => {
            e.preventDefault(); //기본이벤트 방지
            setSearchKeyword(keyword);
          }}
        >
          <input
            className={styles.input_input}
            type="text"
            value={keyword}
            placeholder="대소문자 구별"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          ></input>
          <button type="submit">검색</button>
        </form>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value={0}>과목분류</option>
          <option value={1}>백엔드</option>
          <option value={2}>프론트엔드</option>
          <option value={3}>DB</option>
        </select>
        <select
          value={level}
          onChange={(e) => {
            setLevel(e.target.value);
          }}
        >
          <option value={0}>난이도</option>
          <option value={1}>초급</option>
          <option value={2}>중급</option>
          <option value={3}>고급</option>
        </select>
        <select
          value={order}
          onChange={(e) => {
            setOrder(e.target.value);
          }}
        >
          <option value={0}>정렬순서</option>
          <option value={1}>난이도(오름차순)</option>
          <option value={2}>난이도(내림차순)</option>
          <option value={3}>수강인원(오름차순)</option>
          <option value={4}>수강인원(내림차순)</option>
        </select>
        <button
          type="button"
          onClick={() => {
            setCategory(0);
            setLevel(0);
            setOrder(0);
            setKeyword("");
            setSearchKeyword("");
          }}
        >
          초기화
        </button>
      </div>
    </>
  );
}

const SubjectItem = ({ subject }) => {
  return (
    <ul className={styles.list_wrap}>
      <li className={styles.list_no}>{subject.subjectNo}</li>
      <li className={styles.list_title}>{subject.subjectTitle}</li>
      <li className={styles.list_instructor}>{subject.subjectInstructor}</li>
      <li className={styles.list_category}>{subject.subjectCategory}</li>
      <li className={styles.list_level}>{subject.subjectLevel}</li>
      <li className={styles.list_count}>{subject.subjectCount}</li>
    </ul>
  );
};

export default App;
