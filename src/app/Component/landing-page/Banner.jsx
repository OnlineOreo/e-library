
export default function Banner (){
    return (
        <>
        <div>
            <div id="master_content_div" className="w-100">
                <div className="container-fluid hero-header" style={{ backgroundColor:'#f8f7f7' }}>
                <div className="container-xl px-lg-1">
                    <div className="row justify-content-center mx-0">
                    <div className="col-lg-12 mx-auto text-center">
                        <div className="index-banner">
                        <h2
                            style={{
                            letterSpacing: 2,
                            margin: "0px auto 30px auto",
                            maxWidth: 700,
                            fontSize: "45px !important",
                            fontWeight: "900 !important"
                            }}
                        >
                            <span style={{ color: "#333" }}>
                            Transform Your automation system With LIBVIRTUUA
                            </span>
                        </h2>
                        <p
                            style={{
                            marginTop: 30,
                            fontSize: "15px !important",
                            width: 900,
                            borderRadius: 10,
                            padding: "10px 120px",
                            textAlign: "center",
                            backgroundColor:'var(--primary)',
                            color:'#f8f7f7',
                            margin: "0px auto"
                            }}
                        >
                            Explore a world of knowledge with our library discovery platform
                            – search, discover, and access resources effortlessly..
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}