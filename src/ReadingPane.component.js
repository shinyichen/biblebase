import React from "react";
import './ReadingPane.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';


class ReadingPane extends React.Component {

  static propTypes = {
    bookId: PropTypes.number.isRequired,
    chapter: PropTypes.number.isRequired,
    bibleIndex: PropTypes.object.isRequired,
    verse: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    changeVerseSelectionRequest: PropTypes.func.isRequired
  }

  state = {
    selectedbookId: 0,
    selectedChapter: 0,
    selectedVerse: 1,
    selectedVerseTarget: null,
    hideBookDropdown: true,
    hideChapterDropdown: true
  }

  // add listeners to verse elements
  componentDidMount = () => {
    const verses = document.getElementsByClassName("verse");
    for (let verse of verses) {
      verse.addEventListener("click", this.handleSelectVerseEvent);
    }
  }

  handleDropdownButtonClick = (event) => {
    this.setState({
      selectedbookId: 0,
      selectedChapter: 1,
      hideBookDropdown: !this.state.hideBookDropdown,
      hideChapterDropdown: true,
    });
  }

  handleBookSelection = (event) => {
    this.setState({
        selectedbookId: event.target.value,
        selectedChapter: 1,
        hideChapterDropdown: false
    });
}

  handleChapterSelection = (event) => {
    // call parent function to change selected
    this.props.changeBookChapterRequest(this.state.selectedbookId, parseInt(event.target.value));

    // reset
    this.setState({
      hideBookDropdown: true,
      hideChapterDropdown: true
    });
      
  }

  // handle verse selected event
  handleSelectVerseEvent = (event) => {
    let target = event.currentTarget;
    let book = event.currentTarget.dataset.book;
    let chapter = event.currentTarget.dataset.chapter;
    let verse = event.currentTarget.dataset.verse;
    if (target.classList.contains("verse")) {
      this.props.changeVerseSelectionRequest(parseInt(book), parseInt(chapter), parseInt(verse));

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
    let menu = [];
    if (this.state.selectedbookId !== 0) {
      for (let i = 1; i <= this.props.bibleIndex[this.state.selectedbookId].chapters; i++) {
        menu.push(<option className="chapter-list-item" value={i} key={i}>{i}</option>)
      }
    }
    
    return (
      <div className="reading-pane">
        <div className="book-select">
          <button className="book-dropdown-button" onClick={this.handleDropdownButtonClick}>{this.props.bibleIndex[this.props.bookId].title}</button>
          <div className={classNames("book-dropdown", {hide: this.state.hideBookDropdown})}>
            <ul className="book-list" onClick={this.handleBookSelection}>
              {Object.keys(this.props.bibleIndex).map(bookId => (
                  (<li className={classNames("book-list-item", {highlight: this.props.bibleIndex[bookId].id === this.state.selectedbookId})} 
                  value={bookId} key={bookId}>{this.props.bibleIndex[bookId].title}</li>)
              ))}
            </ul>
          </div>
          <div className={classNames("chapter-dropdown", {hide: this.state.hideChapterDropdown})}>
            <ul className="chapter-list" onClick={this.handleChapterSelection}>
              {menu}
            </ul>
          </div>
        </div>
        <div className="content-pane">
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
      </div>
    );
  }
}

export default ReadingPane;
