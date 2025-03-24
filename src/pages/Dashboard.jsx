import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { History } from "../components/History"

export const Dashboard = () => {
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={"10,000"} />
            <History />
        </div>
    </div>
}