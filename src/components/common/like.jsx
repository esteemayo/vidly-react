import React from 'react';

const Like = ({ liked, onLike }) => {
    let classes = "fa fa-heart";
    if (!liked) classes += '-o';

    return (
        <i
            onClick={onLike}
            style={{ cursor: 'pointer' }}
            className={classes}
            aria-hidden="true"></i>
    );
}

export default Like;