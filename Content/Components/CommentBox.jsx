﻿import React from 'react';
import { CommentList } from './CommentList';
import { CommentForm } from './CommentForm';

export class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { data: props.initialData };
    }

    loadCommentsFromServer() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send();
    }

    handleCommentSubmit(comment) {
        var comments = this.state.data;
        // Optimistically set an id on the new comment. It will be replaced by an
        // id generated by the server. In a production application you would likely
        // not use Date.now() for this and would have a more robust system in place.
        comment.id = Date.now();
        var newComments = comments.concat([comment]);
        this.setState({ data: newComments });

        var data = new FormData();
        data.append('author', comment.author);
        data.append('text', comment.text);

        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.submitUrl, true);
        xhr.onload = () => {
            this.loadCommentsFromServer();
        };
        xhr.send(data);
    }    

    componentDidMount() {
        setInterval(() => this.loadCommentsFromServer, this.props.pollInterval);
    }

    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
            </div>
        );
    }
}