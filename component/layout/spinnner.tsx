import RingLoader from "react-spinners/RingLoader";


function Spinner({ loading }: { loading: boolean }) {

    return (
        <>
            <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }} className="contentWrap">
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <RingLoader
                        color="#b019cf"
                        size={200}
                        speedMultiplier={3}
                        loading={loading}
                    />
                </div>
            </div>

        </>
    );
}

export default Spinner; 