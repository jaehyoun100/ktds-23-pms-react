import { useCallback, useEffect, useMemo, useState } from "react";
import { loadIssue } from "../../http/issueHttp";
import { deleteIssue } from "../../http/issueHttp";

export default function KnowledgeView({
  selectedSplId,
  setSelectedSplId,
  needReload,
  setNeedReload,
  token,
}) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isRecommended, setIsRecommended] = useState(false);

  const backToListHandler = () => {
    setSelectedSplId(undefined);
    setNeedReload(Math.random());
  };

  const memoizedLoadKnowledge = useCallback(loadIssue, []);
  const memoizedParam = useMemo(() => {
    return { selectedSplId, token, needReload };
  }, [selectedSplId, token, needReload]);
  console.log(memoizedParam);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const json = await memoizedLoadKnowledge(memoizedParam);
      setData(json);
      setIsLoading(false);
    };

    fetchData();
  }, [memoizedLoadKnowledge, memoizedParam, setData]);

  const { body: knowledgeBody } = data || {};
  console.log(knowledgeBody);

  const deleteIssueHandler = async () => {
    const json = await deleteIssue(knowledgeBody.isId, token);

    if (json.body) {
      setSelectedSplId(undefined);
      setNeedReload(Math.random());
    } else {
      console.log(json);
      alert(json.errors);
    }
  };

  const UpdateClickHandler = () => {
    setIsUpdateMode(true);
  };
}
