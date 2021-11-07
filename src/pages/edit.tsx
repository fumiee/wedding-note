import { useRouter } from "next/router";
import { EditDelete } from "src/components/post/EditDelite";

const Edit = () => {
  const router = useRouter();
  return <EditDelete id={router.query.id as string} />;
};

export default Edit;
