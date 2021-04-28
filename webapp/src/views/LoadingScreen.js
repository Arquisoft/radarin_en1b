import SyncLoader from "react-spinners/SyncLoader";
import { css } from "@emotion/core";

export default function loadingScreen(className,title){
        return (<div className={className}>
                    <h1>{title}</h1>
                    <SyncLoader css={css`display: block;margin: 0 auto;border-color: red;`} size={40} color={"rgba(255, 127, 22, 0.959)"} />
                </div>);
}