import { useSelector } from "react-redux";
import LoginPage from "../../components/login/Login";
import RouterAppProvider from "../../router/router";
import ConfirmModal from "../../components/common/modal/ConfirmModal";

export default function ComponentSetting() {
  const { token } = useSelector((state) => state.tokenInfo);
  const {
    show,
    content,
    confirmContent,
    cancelContent,
    confirmOnClick,
    cancelOnClick,
  } = useSelector((state) => state.confirmModalInfo);

  return (
    <>
      <ConfirmModal
        show={show}
        content={content}
        confirmContent={confirmContent}
        cancelContent={cancelContent}
        confirmOnClick={confirmOnClick}
        cancelOnClick={cancelOnClick}
      />
      {!token && <LoginPage />}
      {token && (
        <div>
          <RouterAppProvider />
        </div>
      )}
    </>
  );
}
