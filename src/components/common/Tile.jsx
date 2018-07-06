import React from 'react';

export const Tile = ({ tile }) => {
    return (
        <div className="tile">
            <div className="top">
                <img alt={tile.title} src={tile.urlToImage} />
            </div>
            <div className="description">
                { tile.source ? <p>{tile.source.name}</p> : null }
                <p>
                    <a href={tile.url}>{tile.title}</a>
                </p>
            </div>
        </div>
    );
};
