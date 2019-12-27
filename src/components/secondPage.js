import React from "react"
import Axios from "axios"
import LoadingAnimation from "./loadingAnimation";

export default class SecondPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList: [], /* will store all data from get request */
            dataListPagination: [], /* store dataList datas 10 to 10 */
            from: 0, /* marking datalist to find next 10 items */
            loading: true, /* GET request status */
            error: false /* error status */
        }
        this.handleScroll = this.handleScroll.bind(this);
    }

    /* will push 10 new items from datalist to dataListPagination and then display them to user */
    dataAdder = () => {
        const step = 9
        if (this.state.dataList.length > this.state.dataListPagination.length) {
            const from = this.state.from
            for (let i = from; i <= from + step; i++) {
                this.state.dataListPagination.push(this.state.dataList[i])
            }
            this.setState({
                from: from + step
            })
        }
    }

    componentDidMount() {
        Axios.get(`http://stage.achareh.ir/api/karfarmas/address`, {
            auth: {
                username: '09822222222',
                password: 'sana1234'
            }
        }).then(data => {
            if (data.status === 200 && data.statusText === 'OK') {
                this.setState({
                    dataList: data.data,
                    loading: false /* when GET request completed loading status will change to false */
                })
                this.dataAdder() /* push first 9 items to display in page */
            }
        }).catch(error => {
            this.setState({
                loading: false,
                error: true /* if there was any error, error message will be displayed */
            })
            console.log(error)
        })
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    /* if scrolling continues to the bottom of the page, next 10 items will be displayed to user */
    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            this.dataAdder()
        }
    }

    render() {
        const { loading, error } = this.state
        return (
            <div className={"container-fluid vh-100 pt-3 text-white"}>
                {/* if loading is true, then check errors. if there was any error, show error. otherwise show data */}
                {!loading ?
                    [error ? (<div className="alert alert-danger col-10 col-md-8 col-lg-7 col-xl-6 mx-auto" key={'error'}
                                   role="alert">خطایی رخ داده، لطفا صفحه را رفرش کنید.</div>)
                        : (this.state.dataListPagination.map((item, key) => (
                            <div className={"row"} key={key}>
                                <div className={"col-10 col-md-8 col-lg-7 col-xl-6 bordered rounded shadow p-3 mb-3 " +
                                "mx-auto bg-dark-cyan"}>
                                    <p>{item.address}</p>
                                    <p>{item.first_name} {item.last_name} - {item.coordinate_mobile}</p>
                                </div>
                            </div>
                        )))]
                    : <LoadingAnimation />
                }
            </div>
        )
    }
}
