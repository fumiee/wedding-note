import { LoginedLayout } from "src/components/layout/LoginedLayout";
import { UserDelete } from "src/components/UserDelete";

const Withdrawal = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <LoginedLayout>
        <p className="my-20 bg-gray-100">退会するとキロクやtodoリストも消えてしまいます。 退会してもよろしいですか？</p>
        <UserDelete />
      </LoginedLayout>
    </div>
  );
};

export default Withdrawal;
