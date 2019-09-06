import '../assets/sass/card.scss'

import React from 'react'
import { connect } from 'react-redux'
import * as types from '../store/types'
import { parseLinesAndHighlight } from '../store/utilities'

const CardDetails = ({ result, dispatch, term }) => {
    const { _source } = result
    let ordered = {}
    const metaStrings = [
        'page',
        'size',
        'volume',
        'catalognumber',
        'collection',
    ]
    let meta = []
    let main = []
    let auth = []
    let ttl = []
    let full = []

    Object.keys(_source)
        .sort()
        .forEach(key => {
            ordered[key] = _source[key]
        })

    Object.entries(ordered).forEach((s, i) => {
        let item = s[1]
        if (typeof item === 'string' && item.length > 0 && isNaN(item)) {
            item = parseLinesAndHighlight(item, term)
        }

        if (s[1] && s[1].length > 1) {
            if (
                metaStrings.some(v => {
                    return s[0].indexOf(v) >= 0
                })
            ) {
                meta.push(
                    <React.Fragment key={i}>
                        <span className="span-title">{s[0]}</span>
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                        <br />
                    </React.Fragment>
                )
            } else if (s[0].includes('tibtext')) {
                // just set state and create link
                full.push(
                    <a
                        key={i}
                        href="#!"
                        className="full-text-selection right"
                        onClick={() =>
                            dispatch({
                                type: types.SET_FULL_TEXT_DETAILS,
                                details: result,
                            })
                        }
                    >
                        Select Full Text <i className="fal fa-file-alt fa-lg" />
                    </a>
                )
            } else if (s[0].includes('priauth', 'auth')) {
                auth.push(
                    <p key={i} className="author-item flow-text">
                        <span className="span-title">{s[0]}</span>
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                    </p>
                )
            } else if (s[0].includes('ttl', 'title')) {
                ttl.push(
                    <p key={i} className="title-item flow-text">
                        <span className="span-title">{s[0]}</span>
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                    </p>
                )
            } else {
                main.push(
                    <p key={i} className="result-source flow-text">
                        <span className="span-title">{s[0]}</span>
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                    </p>
                )
            }
        }
    })

    return (
        <React.Fragment>
            <div className="meta-items">
                <p className="meta-item">{meta}</p>
            </div>

            {main}

            {auth.length > 0 ? (
                <div className="author-items">
                    <hr />
                    {auth}
                </div>
            ) : null}

            {ttl.length > 0 ? (
                <div className="title-items">
                    <hr />
                    {ttl}
                </div>
            ) : null}

            <div className="meta-items">
                <p className="meta-item">{full}</p>
            </div>
        </React.Fragment>
    )
}

export default connect()(CardDetails)
