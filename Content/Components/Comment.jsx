import React from 'react';

export class Comment extends React.Component {
    rawMarkup() {
        var rawMarkup = this.props.children.toString();
        return { __html: rawMarkup };
    }

    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
}