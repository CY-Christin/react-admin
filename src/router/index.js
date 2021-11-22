import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Login from '@/views/login'
import { connect } from "react-redux";
import {getUserInfo} from "@/store/actions";

class Router extends React.Component {
	render() {
		const { token, role, getUserInfo } = this.props
		return (
            <HashRouter>
                <Switch>
                    <Route exact path="/login" component={Login} />
                </Switch>
            </HashRouter>
        );
	}
}

export default connect((state) => state.user,{getUserInfo})(Router)
