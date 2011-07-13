/**
 * Form Validation
 * v0.1.2
 *
 * @author	Dave Widmer (dwidmer@bgsu.edu)
 */


/**
 * The validate "class"
 *
 * @param	form	The form to validate
 */
var validation = function(form){
	var rules = [],
		errors = {},

	/**
	 * The functions to run rules through
	 */
	valid = function(){
		var regex = {
			email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
		},

		/**
		 * Checks for a valid email address.
		 *
		 * @param	value	Email to check
		 * @return	boolean
		 */
		email = function(field){
			return field.value.match(regex.email);
		},

		/**
		 * Checks to see if a field is valid
		 *
		 * @param	value	The value to check
		 * @return	boolean
		 */
		not_empty = function(field){
			var good = false;

			if (field['length'] && ! field.nodeName){
				// An array of checkboxes
				for (var i = 0, len = field.length; i < len; i += 1){
					if (field[i].checked) {
						good = true;
						break;
					}
				}
			} else {
				good = (field.value !== "");
			}

			return good;
		};

		return {
			'email': email,
			'not_empty': not_empty
		}
	}(),

	/**
	 * The default error messages for the functions
	 */
	defaultErrors = {
		email: function(field){
			return "Pleae enter a valid email for " + field;
		},
		not_empty:function(field){
			return  "Pleae enter a value for " + field;
		}
	},

	/**
	 * Adds a rule to the validator.
	 *
	 * @param	name	The name of the form field
	 * @param	rule	The rule to check
	 * @param	params	Additional param
	 */
	rule = function(name, rule, param){
		rules.push([name, rule, param]);
		return this; // Chaining
	},

	/**
	 * Gets the current errors and formats them if a messaage object is set
	 *
	 * @param	message	The message object
	 * @return	array	The errors
	 */
	getErrors = function(messages){
		var errs = [];

		messages = messages || {};

		for (var prop in errors) {
			var rule = errors[prop][0];
			if (messages[prop] && messages[prop][rule]){
				errs.push(messages[prop][rule]);
			} else {
				errs.push(defaultErrors[rule](prop));
			}
		}

		return errs;
	},

	/**
	 * Since objects don't have a length function we need this...
	 *
	 * @return	num	The length of the object
	 */
	getSize = function(obj){
		var size = 0;
		for (var i in obj){
			size++;
		}

		return size;
	},

	/**
	 * Checks to see if the form is valid or not.
	 *
	 * @return	boolean
	 */
	check = function(){
		errors = {};

		for (var i = 0, len = rules.length; i < len; i += 1){
			var r = rules[i],
				field = r[0],
				rule = r[1],
				param = r[2] || null,
				callback = valid[rule]

			if ( ! callback(form[field], param)) {
				if ( ! errors[field]){
					errors[field] = [];
				}

				errors[field].push(rule);
			}
		}

		return (getSize(errors) === 0);
	};

	// Expose the public stuff
	return {
		'rule': rule,
		'errors': getErrors,
		'check': check
	};
};
