import { UserDelete } from "src/components/UserDelete";

const Withdrawal = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <p className="my-20 bg-gray-100">退会するとキロクやtodoリストも消えてしまいます。 退会してもよろしいですか？</p>
      <UserDelete />
    </div>
  );
};

export default Withdrawal;
