import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import moment from 'moment';

export default Component.extend({
    store: service(),
    showAlert: false,
    showRewardCard: false,
    showErrorMessage: false,

    click() {
        this.set('currentClient', this.item);
        this.set('showVoucherCard', true);
    },

    resetVoucherForm() {
        let today = moment().format('YYYY-MM-DD');

        $('#voucher-issue-date').val(today);
        $('#voucher-expiry-date').val(today);
        $('#voucher-amount').val(0);
    },

        actions: {
            
        createVoucherRecord(data) {
            data.clientId = this.currentClient.id;

            let voucher = this.store.createRecord('voucher', data);

            voucher.save().then(() => {
                this.set('alertMessage', 'Your voucher has been succesfully created...');
                this.set('alertType', 'success');
                this.set('showAlert', true);
                this.set('showRewardCard', true)
                console.log("HAPPENED");

                setTimeout(() => {
                    this.set('showAlert', false);
                }, 3000);
            })
                .catch(() => {
                    this.set('alertMessage', 'An error occurred while creating the voucher... Please try again');
                    this.set('alertType', 'danger');
                    this.set('showAlert', true);
                    this.set('showErrorMessage', true)

                    setTimeout(() => {
                        this.set('showAlert', false);
                    }, 3000);
                });

                this.resetVoucherForm();
            
        }


    }

});