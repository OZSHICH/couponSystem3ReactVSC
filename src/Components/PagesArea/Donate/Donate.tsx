import "./Donate.css";

interface DonateProps {
  to: string;
  bank: number;
  branch: number;
  account: number;
}
function Donate(props: DonateProps): JSX.Element {
  return (
    <div className="Donate flex-col-top-center">
      <h1>Donate</h1>
      <p>💵💵💵This Is An Open Source Coupon System App💵💵💵</p>
      <p>
        💵💵💵Donate Now To: {props.to} | Account Details : {props.bank}-{props.branch}-
        {props.account}💵💵💵
      </p>
    </div>
  );
}

export default Donate;
