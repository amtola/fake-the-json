import React from 'react'

function Switch(props) {
    return (
        <div className="d-flex align-items-center flex-column">
            <button className="btn btn-success align-self-center my-4" onClick={() => props.handleGenerateFakeJson()}>Generate</button>

            <button className="btn btn-primary align-self-center my-4">Copy Output</button>
        </div>
    )
}

export default Switch
