import { useEffect, useState } from "react"

interface ListProps {
	apiName: string
	apiKey: string
}

const DispalyMSG = ({ apiName, apiKey }: ListProps) => {

	const [messag1, setMessage1] = useState<string>("")

	useEffect(() => { }, [apiKey])     // update messages when api-key is recieved

	const copyAPIKey = () => {
		navigator.clipboard.writeText(apiKey)
		setMessage1("API-Key Copied")
	}

	const visitAPI = () => {
		window.open(`${process.env.BASE_URL}/api/${apiName}`, '_blank')
	}

	return (
		<div>
			<h3>{`API-URL: ${process.env.BASE_URL}/api/${apiName}`}
				<button onClick={visitAPI}>
					Visit API
			 	</button>
			</h3>

			<h3>
				{`API-Key: ${apiKey}`}
				<button onClick={copyAPIKey}>
					Copy API-Key
            </button>
				<span>{messag1}</span>
			</h3>

			<h3>Copy and Save API-Key, so you can Edit or Delete this API in future.</h3>

		</div>
	)
}

export default DispalyMSG