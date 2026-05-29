type MessageProps = {
    title: string
    subtitle: string
}

function Message({ title, subtitle }: MessageProps) {

    return (
        <div className="window">
            <div className="message">
                <p>{title}</p>
                <p>{subtitle}</p>
            </div>
        </div>
    )
}

export default Message