import React from "react";
import { getSets, addSet, removeSet } from "../services/db";
import ListSets from "../components/list-sets";

export default class ListSetsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sets: [],
            loading: true
        };
    }

    componentDidMount() {
        this.getSets(this.props.location.state).then(sets => {
            this.setState({
                sets,
                loading: false
            });
        });
    }

    async getSets(newSet) {
        const sets = await getSets();

        if (newSet) {
            const index = sets.findIndex(set => set.id === newSet.id);

            if (index === -1) {
                sets.push(newSet);
            }
            else {
                sets.splice(index, 1, newSet);
            }
            addSet(newSet);
        }
        return sets;
    }

    editSet = set => {
        this.props.history.push({
            pathname: "/flashcards/create",
            state: set
        });
    }

    removeSet = index => {
        const sets = [].concat(this.state.sets);
        const set = sets[index];
        const confirmed = confirm(`Are you sure you want to remve ${set.title} set?`);

        if (confirmed) {
            removeSet(set._id);
            sets.splice(index, 1);
            this.setState({ sets });
        }
    }

    render() {
        return <ListSets
            sets={this.state.sets}
            loading={this.state.loading}
            editSet={this.editSet}
            removeSet={this.removeSet} />;
    }
}
