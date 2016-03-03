import React          from "react";

class DragHandle extends React.Component {

    constructor() {
        super(...arguments);

        this.state = {
            isDragging: false,
            x: null,
            y: null
        };

        this.mouseDown = this.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseUp = this.mouseUp.bind(this);

        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mousemove", this.mouseMove);
        document.addEventListener("mouseup", this.mouseUp);

        document.addEventListener("touchmove", this.touchMove);
        document.addEventListener("touchend", this.touchEnd);
    }

    componentWillUnmount() {
        document.removeEventListener("mousemove", this.boundMouseMove);
        document.removeEventListener("touchmove", this.boundTouchMove);
    }

    shouldComponentUpdate(newProps, newState) {

        let isDragBegin =
            !this.state.isDragging &&
            newState.isDragging;

        let isDragEnd =
            this.state.isDragging &&
            !newState.isDragging;

        let isDragging =
            this.state.isDragging &&
            newState.isDragging &&
            (
                this.state.x != newState.x ||
                this.state.y != newState.y
            );

        if (this.props.onBegin && isDragBegin) {
            this.props.onBegin({
                x: newState.x,
                y: newState.y
            });
        }

        if (this.props.onEnd && isDragEnd) {
            this.props.onEnd({
                x: this.state.x,
                y: this.state.y
            });
        }

        if (this.props.onDrag && isDragging) {
            var deltaX = newState.x - this.state.x;
            var deltaY = newState.y - this.state.y;

            this.props.onDrag({
                x: newState.x,
                y: newState.y
            }, {
                x: deltaX,
                y: deltaY
            });
        }

        return true; // TEMP
    };

    mouseDown(event) {
        event.stopPropagation();
        event.preventDefault();

        this.beginDrag({
            x: event.screenX,
            y: event.screenY
        });
    }

    mouseUp(event) {
        if (!this.state.isDragging) {
            return;
        }

        event.stopPropagation();
        event.preventDefault();

        this.endDrag();
    }

    mouseMove(event) {
        this.drag({
            x: event.screenX,
            y: event.screenY
        });
    }

    touchStart(event) {
        if (event.touches.length != 1) {
            return;
        }

        event.stopPropagation();
        event.preventDefault();

        let touch = event.touches[0];

        this.beginDrag({
            x: touch.screenX,
            y: touch.screenY
        });
    }

    touchEnd(event) {
        if (!this.state.isDragging) {
            return;
        }

        if (event.touches.length != 1) {
            return;
        }

        event.stopPropagation();
        event.preventDefault();

        this.endDrag();
    }

    touchMove(event) {
        if (event.touches.length != 1) {
            return;
        }

        let touch = event.touches[0];

        this.drag({
            x: touch.screenX,
            y: touch.screenY
        });
    }

    beginDrag(initial) {
        this.setState({
            isDragging: true,
            x: initial.x,
            y: initial.y
        });
    }

    endDrag() {
        this.setState({
            isDragging: false,
            x: null,
            y: null
        });
    }

    drag(position) {
        if (!this.state.isDragging) {
            return;
        }

        this.setState({
            x: position.x,
            y: position.y
        });
    }

    render() {

        let events = {

            // Mouse Events
            onMouseDown: this.mouseDown,

            // Touch Events
            onTouchStart: this.touchStart,

        };

        return (
            <div className="c-drag-handle"
                {...events}>
                {React.Children.only(this.props.children)}
            </div>
        )

    }

}

export default DragHandle;
