import React from "react";

export default class ServiceWorkerPopup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            message: ""
        };
    }

    componentDidMount() {
        window.addEventListener("sw-state-change", ({ detail }) => {
            if (detail === "init") {
                this.showPopup("Content is cached for offline use.");
            }
            else if (detail === "update") {
                this.showPopup("Update is available, please refresh.");
            }
        });
    }

    showPopup(message) {
        this.setState({
            visible: true,
            message
        });

        setTimeout(() => {
            this.setState({
                visible: false
            });
        }, 6000);
    }

    render() {
        return (
            <div className={`service-worker-popup${this.state.visible ? " visible" : ""}`}>
                <p>{this.state.message}</p>
            </div>
        );
    }
}
