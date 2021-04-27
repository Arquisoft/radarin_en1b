import SyncLoader from "react-spinners/SyncLoader";
import { css } from "@emotion/core";

export default function loadingScreen(){
        return (<div className="waiting-screen">
                    <h1>Radarin Manager is computing your locations... </h1>
                    <SyncLoader css={css`display: block;margin: 0 auto;border-color: red;`} size={40} color={"rgba(255, 127, 22, 0.959)"} />
                </div>);
}