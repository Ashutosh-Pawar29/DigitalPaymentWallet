import { Link } from "react-router-dom";

export function Menubutton({ buttonText, to, svgPath }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: "8px",
                margin: "20px",
                width: "120px",
                height: "120px",
            }}
        >
            <Link
                to={to}
                style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "15px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                }}
            >
                <img src={svgPath} alt="icon" width="40" height="40" />

                {buttonText}
            </Link>
        </div>
    );
}
