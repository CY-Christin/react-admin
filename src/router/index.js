import React from "react";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import Login from '@/views/login'
import { connect } from "react-redux";
import {getUserInfo} from "@/store/actions";
import Layout from "@/views/layout";

class Router extends React.Component {
	render() {
		const { token, role, getUserInfo } = this.props
		return (
            <HashRouter>
                <Switch>
                    <Route exact path="/login" component={Login} />
					<Route
						path="/"
						render={() => {
							if (!token){
								return <Redirect to='/login' />
							}else {
								if(role) {
									return <Layout/>
								}else {
									getUserInfo(token).then(()=> <Layout/>)
								}
							}
						}}
					/>
                </Switch>
            </HashRouter>
        );
	}
}

export default connect((state) => state.user,{getUserInfo})(Router)
