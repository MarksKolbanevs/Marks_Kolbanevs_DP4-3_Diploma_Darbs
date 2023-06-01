import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Verify } from "../../../requests/AuthRequests";

export default function EmailVerifictaionPage(){
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        async function fetchData() {
          try {
            await Verify(searchParams.get("token") ?? "");
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
    }, []);
    
    return(
        <h1>
            Email verificated!
        </h1>
    );
}