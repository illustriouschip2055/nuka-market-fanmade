type ErrorProps = {
    errorMsg: string
    bgColor: string
}

function Error({errorMsg, bgColor}: ErrorProps) {
    return (
        <div className="error-container" style={{backgroundColor: bgColor}}>
            <h2 className="error-title">
                Something went wrong
            </h2>

            <p className="error-text">
                {errorMsg}
            </p>
        </div>
    )
}

export default Error