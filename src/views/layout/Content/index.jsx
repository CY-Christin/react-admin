import React from "react";
import { Redirect, withRouter, Route, Switch} from "react-router-dom";
import DocumentTitle from "react-document-title";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Layout } from "antd";
import { getMenuItemInMenuListByProperty } from '@/utils'
