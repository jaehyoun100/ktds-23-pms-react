import { useRef, useState, useEffect } from "react";
import axios from "react";

export default function IssueForm() {
  const [isCntnt, setIsCntnt] = useState("");
  const [file, setFile] = useState(null);
  const [rqmId, setRqmId] = useState("");
  const [isTtl, setIsTtl] = useState("");
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const isId = useRef(null);
  const editorInstance = useRef(null);

  useEffect(() => {
    // 에디터 초기화
    editorInstance.current = loadEditor(".editor", "내용을 입력하세요.");
    isId.current = document.querySelector(".grid").dataset.id;

    // 진행 중인 카테고리 목록 불러오기
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories?status=ongoing");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

    return () => {
      // Cleanup 에디터 인스턴스
      if (editorInstance.current) {
        editorInstance.current.destroy();
      }
    };
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClick = async (event, type) => {
    event.preventDefault();
    const isCntnt = editorInstance.current.getData("isCntnt");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("isId", isId.current);
    formData.append("isTtl", isTtl);
    formData.append("rqmId", rqmId);
    formData.append("isCntnt", isCntnt);

    const url = `/ajax/issue/${type}`;

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { errors, result } = response.data;
      setErrors(errors || {});

      if (result) {
        window.location.href = "/issue";
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <form>
      <div className="editor">내용을 입력하세요.</div>
      <input type="file" id="file" onChange={handleFileChange} />
      <select
        id="rqm-id"
        value={rqmId}
        onChange={(e) => setRqmId(e.target.value)}
      >
        <option value="">카테고리를 선택하세요</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        id="issue-title"
        value={isTtl}
        onChange={(e) => setIsTtl(e.target.value)}
      />

      <button
        type="button"
        data-type="save"
        onClick={(event) => handleClick(event, "save")}
      >
        저장
      </button>
      <button
        type="button"
        data-type="submit"
        onClick={(event) => handleClick(event, "submit")}
      >
        제출
      </button>

      {/* 에러 메시지 표시 */}
      {Object.keys(errors).map((key) => (
        <div className="error" key={key}>
          {errors[key].map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      ))}
    </form>
  );
}
/*
function loadEditor(selector, placeholder) {
    return{
        getData: (key) => {
            return document.querySelector(selector).innerText;
        }, 
        destroy: () => {

        },
    };
}
*/
// 에디터 로드 함수 예시
function loadEditor(selector, placeholder) {
  // 여기에 에디터 초기화 로직을 추가하세요.
  // 예: CKEditor, TinyMCE 등을 초기화하는 코드
  return {
    getData: (key) => {
      // 에디터에서 데이터 가져오는 로직
      return document.querySelector(selector).innerText;
    },
    destroy: () => {
      // 에디터 인스턴스 제거 로직
    },
  };
}
