import React from "react";

export default class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            duration: props.duration
        };
        this.timeoutId = 0;
    }

    componentDidMount() {
        this.runTimer(performance.now(), 0);
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

    runTimer(startTime, elapsed) {
        const ideal = performance.now() - startTime;
        const diff = ideal - elapsed;

        this.timeoutId = setTimeout(() => {
            this.update(startTime, elapsed + 1000);
        }, 1000 - diff);
    }

    update(startTime, elapsed) {
        const duration = this.state.duration - 1;

        if (duration < 1) {
            this.setState({ duration });
            this.props.callback();
            return;
        }
        this.setState({ duration }, () => {
            this.runTimer(startTime, elapsed);
        });
    }

    render() {
        const duration = this.formatDuration(this.state.duration);

        return <div className="study-timer">{duration}</div>;
    }
}
