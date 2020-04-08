import React from "react";
import './ReadingPane.css';
import PropTypes from 'prop-types';

class ReadingPane extends React.Component {

  static propTypes = {
    bookId: PropTypes.string.isRequired,
    chapter: PropTypes.number.isRequired,
    bibleIndex: PropTypes.object.isRequired,
    verse: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    changeVerseSelectionRequest: PropTypes.func.isRequired
  }

  state = {
    selectedVerse: 1,
    selectedVerseTarget: null,
  }

  // add listeners to verse elements
  componentDidMount = () => {
    const verses = document.getElementsByClassName("verse");
    for (let verse of verses) {
      verse.addEventListener("click", this.handleSelectVerseEvent);
    }
  }

  // handle verse selected event
  handleSelectVerseEvent = (event) => {
    let target = event.currentTarget;
    let book = event.currentTarget.dataset.book;
    let chapter = event.currentTarget.dataset.chapter;
    let verse = event.currentTarget.dataset.verse;
    if (target.classList.contains("verse")) {
      this.props.changeVerseSelectionRequest(book, parseInt(chapter), parseInt(verse));

      // clear previous selection
      if (this.state.selectedVerseTarget !== null)
        this.state.selectedVerseTarget.classList.remove("selected");
      
      // set current selection
      target.classList.add("selected");
      this.setState({
        selectedVerse: verse,
        selectedVerseTarget: target
      });
    }
  }

  render() {
    if (Object.keys(this.props.data).length === 0) {
      return <div></div>
    }
    const verses = this.props.data['verses'];

    return (
      <div className="reading-pane">
        <div className="chapter">
          <div className="title">{this.props.bibleIndex[this.props.bookId].title} {this.props.chapter}</div>
          {verses.map( verse => (
            <span className="verse" 
              key={`${this.props.bookId}.${verse.chapter}.${verse.verse}`}
              data-book={this.props.bookId}
              data-chapter={this.props.chapter}
              data-verse={verse.verse}
              onClick={this.handleSelectVerseEvent} >
              <span className="label">{verse.verse}</span>
              <span className="content">
                {verse.text}
              </span>
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default ReadingPane;
