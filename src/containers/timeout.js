import React from "react";

export default class TimeoutContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            duration: props.duration
        };
        this.timeoutId = 0;
    }

    componentDidMount() {
        this.setTimeout(performance.now(), 0);
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
    }

    getSeconds(duration) {
        const seconds = duration % 60;

        return seconds < 10 ? `0${seconds}` : seconds;
    }

    getMinutes(duration) {
        const minutes = Math.floor(duration / 60 % 60);

        return duration >= 3600 && minutes < 10 ? `0${minutes}` : minutes;
    }

    getHours(duration) {
        return Math.floor(duration / 3600);
    }

    formatDuration(duration) {
        const seconds = this.getSeconds(duration);
        const minutes = this.getMinutes(duration);
        const hours = this.getHours(duration);

        return `${hours ? `${hours}:` : ""}${minutes}:${seconds}`;
    }

    setTimeout(startTime, elapsed) {
        const duration = this.state.duration;
        this.formatedDuration = this.formatDuration(duration);

        if (!duration) {
            this.setState({ duration: -1 });
            this.props.callback();
            return;
        }
        this.setState({
            duration: duration - 1
        }, () => {
            const ideal = performance.now() - startTime;
            const diff = ideal - elapsed;

            this.timeoutId = setTimeout(() => {
                this.setTimeout(startTime, elapsed + 1000);
            }, 1000 - diff);
        });
    }

    render() {
        return this.state.duration < 0 ? null : (
            <div className="study-timeout" title="Time left till answer reveal">{this.formatedDuration}</div>
        );
    }
}
