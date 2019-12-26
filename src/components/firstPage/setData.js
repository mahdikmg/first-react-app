import React from "react";
import Axios from 'axios'
import {withRouter, Link} from 'react-router-dom'

class SetData extends React.Component {
    constructor(props) {
        super(props);
        this.state = { /* store value and error for every input in form */
            name: '',
            nameError: null,
            familyName: '',
            familyNameError: null,
            mobileNumber: '',
            mobileNumberError: null,
            phoneNumber: '',
            phoneNumberError: null,
            address: '',
            addressError: null,
            gender: '',
            genderError: null,
            submitError: false /* when an error occurred on submitting form, value changing to true and error message will be shown */
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value }) /* handle all inputs value changes */
    }

    /* validation and store error data if there is any error */
    validateName = () => {
        this.setState({
            nameError:
                this.state.name.length > 0 ? null : 'این فیلد اجباری است.',
        });
    }

    validateFamilyName = () => {
        this.setState({
            familyNameError:
                this.state.familyName.length > 0 ? null : 'این فیلد اجباری است.'
        });
    }

    validateMobileNumber = () => {
        this.setState({
            mobileNumberError:
                (((this.state.mobileNumber.length) === 11) && !isNaN(this.state.mobileNumber)) ? null :
                    'این فیلد اجباری است و باید حاوی شماره تلفن همراه 11 رقمی شما باشد.'
        });
    }

    validatePhoneNumber = () => {
        this.setState({
            phoneNumberError:
                (((this.state.phoneNumber.length) === 11) && !isNaN(this.state.phoneNumber)) ? null :
                    'این فیلد اجباری است و باید حاوی شماره تلفن ثابت 11 رقمی شما باشد.'
        });
    }

    validateAddress = () => {
        this.setState({
            addressError:
                this.state.address.length > 0 ? null : 'این فیلد اجباری است.'
        });
    }

    validateGender = () => {
        this.setState({
            genderError:
                this.state.gender.length > 0 ? null : 'لطفا یک گزینه را انتخاب کنید.'
        });
    }

    /* submit function */
    setData = (e) => {
        e.preventDefault()
        let data = {
            region: 1,
            address: this.state.address,
            lat: this.props.getMapData[0], /* get map coordinate */
            lng: this.props.getMapData[1],
            coordinate_mobile: this.state.mobileNumber,
            coordinate_phone_number: this.state.phoneNumber,
            first_name: this.state.name,
            last_name: this.state.familyName,
            gender: this.state.gender
        };
        if (this.canBeSubmited()) {
            Axios.post(`http://stage.achareh.ir/api/karfarmas/address`, { data }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                auth: {
                    username: '09822222222',
                    password: 'sana1234'
                }
            }).then(res => {
                if (res) {
                    this.props.history.push("/addresses")
                }
            }).catch(e => {
                this.setState({
                    submitError: true
                })
            })
        }

    };

    /* check all errors to be null and all fields to have value */
    canBeSubmited() {
        return (this.state.nameError === null && this.state.familyNameError === null && this.state.phoneNumberError === null &&
    this.state.mobileNumberError === null && this.state.addressError === null && this.state.genderError === null && this.state.gender.length > 0 &&
        this.state.name.length > 0 && this.state.familyName.length > 0 && this.state.phoneNumber.length > 0 && this.state.mobileNumber.length > 0 &&
        this.state.address.length > 0)
    }

    render(){
        const isEnabled = this.canBeSubmited()
        return (
            <div>
                {/* when submit function responds with error */}
                {this.state.submitError ?
                    <div className="alert alert-danger mx-auto" key={'error2'} role="alert"><span>
                        ضدحال :( متاسفانه مشکلی رخ داده. لطفا دوباره تلاش کنید.
                    </span></div> : ''}

                <div className={"p-5"}>
                    <h5>لطفا اطلاعات خود را وارد کنید.</h5>
                    <form onSubmit={this.setData} className={"mb-3"} noValidate>

                        <div className={"form-group"}>
                            <label htmlFor="name"><span className={"text-danger"}>*</span> نام</label>
                            {/* class names to style valid or invalid data */}
                            <input type="text" className={"form-control " + (this.state.nameError === null ?
                                [this.state.name.length === 0 ? '' : 'is-valid'] : 'is-invalid')}
                                   onChange={this.handleChange} onBlur={this.validateName}
                                   value={this.state.name} id="name" name="name" required autoComplete={"off"}/>
                            <span className={"invalid-feedback"}>{this.state.nameError}</span>
                        </div>

                        <div className={"form-group"}>
                            <label htmlFor="familyName"><span className={"text-danger"}>*</span> نام خانوادگی</label>
                            <input type="text" className={"form-control " + (this.state.familyNameError === null ?
                                [this.state.familyName.length === 0 ? '' : 'is-valid'] : 'is-invalid')}
                                   onChange={this.handleChange} onBlur={this.validateFamilyName}
                                   value={this.state.familyName} id="familyName" name="familyName" required autoComplete={"off"}/>
                            <span className={"invalid-feedback"}>{this.state.familyNameError}</span>
                        </div>

                        <div className={"form-group"}>
                            <label htmlFor="mobileNumber"><span className={"text-danger"}>*</span> تلفن همراه</label>
                            <input type="tel" className={"form-control " + (this.state.mobileNumberError === null && !isNaN(this.state.mobileNumber) ?
                                [this.state.mobileNumber.length === 0 ? '' : 'is-valid'] : 'is-invalid')}
                                   onChange={this.handleChange} onBlur={this.validateMobileNumber}
                                   value={this.state.mobileNumber} id="mobileNumber" name="mobileNumber" required autoComplete={"off"}/>
                            <span className={"invalid-feedback"}>{this.state.mobileNumberError}</span>
                        </div>

                        <div className={"form-group"}>
                            <label htmlFor="phoneNumber"><span className={"text-danger"}>*</span> تلفن ثابت</label>
                            <input type="tel" className={"form-control " + (this.state.phoneNumberError === null && !isNaN(this.state.phoneNumberError) ?
                                [this.state.phoneNumber.length === 0 ? '' : 'is-valid'] : 'is-invalid')}
                                   onChange={this.handleChange} onBlur={this.validatePhoneNumber}
                                   value={this.state.phoneNumber} id="phoneNumber" name="phoneNumber" required autoComplete={"off"}/>
                            <span className={"invalid-feedback"}>{this.state.phoneNumberError}</span>
                        </div>

                        <div className={"form-group"}>
                            <label htmlFor="address"><span className={"text-danger"}>*</span> آدرس دقیق</label>
                            <textarea className={"form-control resize-none "+ (this.state.addressError === null ?
                                [this.state.address.length === 0 ? '' : 'is-valid'] : 'is-invalid')}
                                      onChange={this.handleChange} onBlur={this.validateAddress}
                                      value={this.state.address} id="address" name="address" rows="4" required autoComplete={"off"}/>
                            <span className={"invalid-feedback"}>{this.state.addressError}</span>
                        </div>

                        <div className={"form-group"}>
                            <label><span className={"text-danger"}>*</span> جنسیت</label>
                            <div className="form-check form-check-inline">
                                <input type="radio" className={"form-check-input"} onChange={this.handleChange}
                                       onBlur={this.validateGender}
                                       value="male" id="male" name="gender" checked={this.state.gender === 'male'}
                                       required/>
                                <label className={"form-check-label"} htmlFor="male">مذکر</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="radio" className={"form-check-input"} onChange={this.handleChange}
                                       onBlur={this.validateGender}
                                       value="female" id="female" name="gender" checked={this.state.gender === 'female'}/>
                                <label className={"form-check-label"} htmlFor="female">مونث</label>
                            </div>
                            <span className={"invalid-feedback"}>{this.state.genderError}</span>
                        </div>

                        <input type="submit" className={"btn btn-primary"} value="مرحله بعد" disabled={!isEnabled}/>
                    </form>
                    {this.state.submitError ?
                        <div>
                            <span>درصورت استمرار در عدم ثبت فرم </span>
                            <Link to="/addresses" className={"text-danger"}>برای رفتن به صفحه آدرس ها کلیک کنید</Link>
                        </div> : ''}
                </div>
            </div>
        )
    }
}

export default withRouter(SetData)
