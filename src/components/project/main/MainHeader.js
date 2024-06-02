import "../project.css";
export default function MainHeader() {
  return (
    <div className="header-container">
      <div className="flex">
        <h4>
          <span>담당부서</span> / <span>프로젝트명</span>
        </h4>
        <h6>PM : 아무개</h6>
      </div>
      <div className="header-menu">
        <span>참여원관리</span>
        <span>요구사항</span>
        <span>이슈관리</span>
        <span>문답</span>
        <span>산출물</span>
        <span>설문</span>
        <span>후기</span>
      </div>
    </div>
  );
}
