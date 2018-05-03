import React, { Component } from "react";

export default class Timeout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            duration: props.duration || -1,
            formatedDuration: this.formatDuration(props.duration)
        };
        this.timeoutId = 0;
    }

    componentDidMount() {
        if (this.state.duration > 0) {
            this.runTimer(performance.now(), 0);
        }
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

        if (duration < 0) {
            this.setState({ duration });
            this.props.callback();
            return;
        }
        this.setState({
            duration,
            formatedDuration: this.formatDuration(duration)
        }, () => {
            this.runTimer(startTime, elapsed);
        });
    }

    render() {
        const { duration, formatedDuration } = this.state;
        return duration >= 0 ? <div className="study-timeout">{formatedDuration}</div> : null;
    }
}
