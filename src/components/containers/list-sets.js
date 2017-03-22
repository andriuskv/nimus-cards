import React from "react";
import ListSets from "../views/list-sets";

export default class ListSetsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sets: this.getSets(props.location.state)
        };
    }

    saveSets(sets) {
        localStorage.setItem("nimus-cards-sets", JSON.stringify(sets));
    }

    getSets(newSet) {
        const sets = JSON.parse(localStorage.getItem("nimus-cards-sets")) || [];

        if (newSet) {
            const index = sets.findIndex(set => set.id === newSet.id);

            if (index === -1) {
                sets.push(newSet);
            }
            else {
                sets.splice(index, 1, newSet);
            }
            this.saveSets(sets);
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
        const confirmed = confirm(`Are you sure you want to remve ${sets[index].title} set?`);

        if (confirmed) {
            sets.splice(index, 1);
            this.setState({ sets });
            this.saveSets(sets);
        }
    }

    render() {
        return <ListSets sets={this.state.sets} editSet={this.editSet} removeSet={this.removeSet} />;
    }
}
