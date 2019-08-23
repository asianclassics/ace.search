import '../assets/sass/fulltext.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { parseLines, createPages } from '../store/utilities'

class FullText extends Component {
    state = {
        parsedText: {},
        numPages: 0,
        paginationMsg: ``,
        currentPage: null,
        count: 0,
        currentKey: '',
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyDowns, false)
        const pages = createPages(
            this.props.text._source.tibtext,
            this.props.term
        )
        console.log(pages)
        this.setState({
            parsedText: pages,
            numPages: pages.length,
            paginationMsg: `Folios ${pages[0].id} to ${
                pages[pages.length - 1].id
            }.`,
        })
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDowns, false)
    }

    keyDowns = e => {
        if (e.key === 'ArrowRight') {
            if (this.state.count < this.state.parsedText.length - 1) {
                this.setState({ count: this.state.count + 1 })
            }
        } else if (e.key === 'ArrowLeft') {
            if (this.state.count > 0) {
                this.setState({ count: this.state.count - 1 })
            }
        }
    }

    useCounter = () => {
        const count = this.state.count
        const max = this.state.parsedText.length - 1
        return {
            value: count,
            max: () => this.setState({ count: max }),
            min: () => this.setState({ count: 0 }),
            increase: () =>
                count === max
                    ? null
                    : this.setState({ count: this.state.count + 1 }),
            decrease: () =>
                count === 0
                    ? null
                    : this.setState(prevState => ({
                          count: prevState.count - 1,
                      })),
        }
    }

    render() {
        const { numPages, parsedText, paginationMsg } = this.state
        const counter = this.useCounter()

        let btnEnables = {
            disableMin: false,
            disableMax: false,
            disableInc: false,
            disableDec: false,
        }

        if (counter.value <= 0) {
            btnEnables.disableMin = true
            btnEnables.disableDec = true
        } else if (counter.value >= this.state.parsedText.length - 1) {
            btnEnables.disableMax = true
            btnEnables.disableInc = true
        }

        if (
            (Object.entries(parsedText).length === 0 &&
                parsedText.constructor === Object) ||
            !this.props.text
        ) {
            return null
        }

        return (
            <div className="card grey lighten-3">
                <div className="card-content blue-grey-text darken-4">
                    <p className="result-meta">{`This text has approximately ${numPages} pages. ${paginationMsg}`}</p>
                    <div className="full-text-details">
                        <span className="full-text-details">
                            <i className="fad fa-arrow-right" /> Expandable
                            Details Pane (Coming Soon)
                        </span>
                    </div>
                    <div className="full-text-details">
                        <span className="full-text-details">
                            <i className="fad fa-arrow-right" /> Controls for
                            NEXT / PREV term match (Coming Soon)
                        </span>
                    </div>
                    <div className="full-text-ctls">
                        <a
                            href="#!"
                            disabled={btnEnables.disableMin}
                            className="waves-effect waves-light btn-flat"
                            onClick={counter.min}
                        >{`<<`}</a>
                        <a
                            href="#!"
                            disabled={btnEnables.disableDec}
                            className="waves-effect waves-light btn-flat"
                            onClick={counter.decrease}
                        >{`<`}</a>
                        <a
                            href="#!"
                            disabled={btnEnables.disableInc}
                            className="waves-effect waves-light btn-flat"
                            onClick={counter.increase}
                        >{`>`}</a>
                        <a
                            href="#!"
                            disabled={btnEnables.disableMax}
                            className="waves-effect waves-light btn-flat"
                            onClick={counter.max}
                        >{`>>`}</a>
                        <p className="full-text-pages">
                            {parsedText[counter.value].id}
                        </p>
                    </div>

                    <div className="flow-text">
                        <p
                            className="full-text"
                            dangerouslySetInnerHTML={{
                                __html: parseLines(
                                    parsedText[counter.value].data,
                                    this.props.term
                                ),
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    text: state.selectedText,
    term: state.currentSearchTerm,
})

export default connect(mapStateToProps)(FullText)
