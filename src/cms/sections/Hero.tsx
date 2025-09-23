
export default function Hero({data}:any) {
console.log("Hero data",data);
  return (
    <div>{data?.heroTitle}</div>
  );
}
