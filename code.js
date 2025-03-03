//TODO Ziel: Ich mache die Tabellenreihenfolge random, so muss wirklich auch auf die Tabellenbezeichnung geachtet werden

class Helper {

    alphabet = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];

    names_used = [];

    get_name_not_used_yet(){
        var name;
        for(i=0;i<60;i++){
            var ran = document.new_random_integer(26);
            if(!this.names_used.includes(this.alphabet[ran])){
                this.names_used.push(this.alphabet[ran]);
                name = this.alphabet[ran];
                i = i + 60;
            }
        }
        return name;
    }
}

class stringBuilderClass {
    create_stmt (join_type, pos_error){
        var stmt = '';
        //stmt += pos_error + '\n\n';
        var order_dec = document.new_random_integer(2);
        var order_in_condition;
        if(order_dec === 0){
            order_in_condition = 'inorder';
        }
        if(order_dec === 1){
            order_in_condition = 'reversed';
        }
        stmt += this.built_statement(join_type, pos_error, order_in_condition);
        helper.names_used = [];
        return stmt;
    }

    built_statement(join_type, pos_error, order_in_condition){
        var task = '\nSELECT *  \nFROM ';
        switch (join_type) {
            case 'join_on_even': task += this.built_join_on_even(join_type, pos_error, order_in_condition);break;
            case 'join_on_uneven': task += this.built_join_on_uneven(join_type, pos_error, order_in_condition);break;
            case 'join_using' : task += this.built_join_using(join_type, pos_error, order_in_condition);break;
        }
        return task;
    }
//TODO warum kommt hier noch nichts
    built_join_on_even(join_type, pos_error, order_in_condition){


        var att_name_1 = helper.get_name_not_used_yet();
        var att_name_2 = helper.get_name_not_used_yet();
        var att_name_sub = helper.get_name_not_used_yet();

        var att_name_1_2 = helper.get_name_not_used_yet();
        var att_name_2_2 = helper.get_name_not_used_yet();

        var table_name_1 = helper.get_name_not_used_yet();
        var table_name_2 = helper.get_name_not_used_yet();
        var table_name_sub = helper.get_name_not_used_yet();

        var att_name_additionally_1 = helper.get_name_not_used_yet();
        var att_name_additionally_2 = helper.get_name_not_used_yet();
        var att_name_additionally_sub = helper.get_name_not_used_yet();
        var att_name_additionally_1_pos = document.new_random_integer(3);
        var att_name_additionally_2_pos = document.new_random_integer(3);
        var att_name_additionally_sub_pos = document.new_random_integer(3);

        var att_name_wrong = helper.get_name_not_used_yet();

        var stmt = '';
        if(pos_error === '1'){
            stmt += '(SELECT ' + att_name_wrong + ',' + att_name_additionally_1 + ',' + att_name_sub + '\nFROM ' +
                table_name_1 + ' JOIN ' + table_name_sub + '\nON(';
        }
        if(pos_error === '2'){
            stmt += '(SELECT ' + att_name_wrong + ',' + att_name_additionally_1 + ',' + att_name_wrong + '\nFROM ' +
                table_name_1 + ' JOIN ' + table_name_sub + '\nON(';
        }
        if (pos_error === '3' || pos_error === '4'){
            stmt += '(SELECT ' + att_name_1 + ',' + att_name_additionally_1 + ',' + att_name_sub + '\nFROM ' +
                table_name_1 + ' JOIN ' + table_name_sub + '\nON(';
        }

        if(order_in_condition === 'inorder'){
            stmt += table_name_1 + '.' + att_name_1 + ' = ' + table_name_sub + '.' + att_name_1;
            stmt += ' AND ';
            stmt += table_name_1 + '.' + att_name_sub + ' = ' + table_name_sub + '.' + att_name_sub;
            stmt += ')    ';
        }
        if(order_in_condition === 'reversed'){
            stmt += table_name_1 + '.' + att_name_sub + ' = ' + table_name_sub + '.' + att_name_sub;
            stmt += ' AND ';
            stmt += table_name_1 + '.' + att_name_1 + ' = ' + table_name_sub + '.' + att_name_1;
            stmt += ')    ';
        }

        if (pos_error === '3' || pos_error === '4') {
            switch (att_name_additionally_1_pos) {
                case 0:
                    stmt += table_name_1 + '(' + att_name_additionally_1 + ',' + att_name_1 + ',' + att_name_sub + ')';
                    break;
                case 1:
                    stmt += table_name_1 + '(' + att_name_1 + ',' + att_name_additionally_1 + ',' + att_name_sub + ')';
                    break;
                case 2:
                    stmt += table_name_1 + '(' + att_name_1 + ',' + att_name_sub + ',' + att_name_additionally_1 + ')';
                    break;
            }
            stmt += '\n)q1                            ';
            switch (att_name_additionally_sub_pos) {
                case 0:
                    stmt += table_name_sub + '(' + att_name_additionally_sub + ',' + att_name_1 + ',' + att_name_sub + ')';
                    break;
                case 1:
                    stmt += table_name_sub + '(' + att_name_1 + ',' + att_name_additionally_sub + ',' + att_name_sub + ')';
                    break;
                case 2:
                    stmt += table_name_sub + '(' + att_name_1 + ',' + att_name_sub + ',' + att_name_additionally_sub + ')';
                    break;
            }
        }
        if (pos_error === '1' || pos_error === '2') {
            var att_name_1_pos_dec = document.new_random_integer(2);


            if (pos_error === '1') {
                switch (att_name_additionally_1_pos) {
                    case 0:
                        stmt += table_name_1 + '(' + att_name_additionally_1 + ',' + att_name_wrong + ',' + att_name_sub + ')';
                        break;
                    case 1:
                        stmt += table_name_1 + '(' + att_name_wrong + ',' + att_name_additionally_1 + ',' + att_name_sub + ')';
                        break;
                    case 2:
                        stmt += table_name_1 + '(' + att_name_wrong + ',' + att_name_sub + ',' + att_name_additionally_1 + ')';
                        break;
                }
                stmt += '\n)q1                            ';
                switch (att_name_additionally_sub_pos) {
                    case 0:
                        stmt += table_name_sub + '(' + att_name_additionally_sub + ',' + att_name_wrong + ',' + att_name_sub + ')';
                        break;
                    case 1:
                        stmt += table_name_sub + '(' + att_name_wrong + ',' + att_name_additionally_sub + ',' + att_name_sub + ')';
                        break;
                    case 2:
                        stmt += table_name_sub + '(' + att_name_wrong + ',' + att_name_sub + ',' + att_name_additionally_sub + ')';
                        break;
                }
            } else {
                switch (att_name_additionally_1_pos) {
                    case 0:
                        stmt += table_name_1 + '(' + att_name_additionally_1 + ',' + att_name_1 + ',' + att_name_wrong + ')';
                        break;
                    case 1:
                        stmt += table_name_1 + '(' + att_name_1 + ',' + att_name_additionally_1 + ',' + att_name_wrong + ')';
                        break;
                    case 2:
                        stmt += table_name_1 + '(' + att_name_1 + ',' + att_name_wrong + ',' + att_name_additionally_1 + ')';
                        break;
                }
                stmt += '\n)q1                            ';
                switch (att_name_additionally_sub_pos) {
                    case 0:
                        stmt += table_name_sub + '(' + att_name_additionally_sub + ',' + att_name_1 + ',' + att_name_wrong + ')';
                        break;
                    case 1:
                        stmt += table_name_sub + '(' + att_name_1 + ',' + att_name_additionally_sub + ',' + att_name_wrong + ')';
                        break;
                    case 2:
                        stmt += table_name_sub + '(' + att_name_1 + ',' + att_name_wrong + ',' + att_name_additionally_sub + ')';
                        break;
                }
            }
        }
        if (pos_error !== '3') {
            stmt += '\nJOIN ' + table_name_2 + '\n';
            stmt += 'ON(';
            if (order_in_condition === 'inorder') {
                stmt += 'q1.' + att_name_1 + ' = ' + table_name_2 + '.' + att_name_1;
                stmt += ' AND ';
                stmt += 'q1.' + att_name_additionally_1 + ' = ' + table_name_2 + '.' + att_name_additionally_1;
                stmt += ')  ';
            }
            if (order_in_condition === 'reversed') {
                stmt += 'q1.' + att_name_additionally_1 + ' = ' + table_name_2 + '.' + att_name_additionally_1;
                stmt += ' AND ';
                stmt += 'q1.' + att_name_1 + ' = ' + table_name_2 + '.' + att_name_1;
                stmt += ')  ';
            }
            switch (att_name_additionally_2_pos) {
                case 0:
                    stmt += table_name_2 + '(' + att_name_additionally_2 + ',' + att_name_additionally_1 + ',' + att_name_1 + ')';
                    break;
                case 1:
                    stmt += table_name_2 + '(' + att_name_additionally_1 + ',' + att_name_additionally_2 + ',' + att_name_1 + ')';
                    break;
                case 2:
                    stmt += table_name_2 + '(' + att_name_additionally_1 + ',' + att_name_1 + ',' + att_name_additionally_2 + ')';
                    break;
            }
        }
        if(pos_error === '3'){
            var projection_dec = document.new_random_integer(2);
            if(projection_dec === 0){ //fehler in dritter tabelle
                stmt += '\nJOIN ' + table_name_2 + '\n';
                stmt += 'ON(';
                if (order_in_condition === 'inorder') {
                    stmt += 'q1.' + att_name_1 + ' = ' + table_name_2 + '.' + att_name_1;
                    stmt += ' AND ';
                    stmt += 'q1.' + att_name_additionally_1 + ' = ' + table_name_2 + '.' + att_name_additionally_1;
                    stmt += ')  ';
                }
                if (order_in_condition === 'reversed') {
                    stmt += 'q1.' + att_name_additionally_1 + ' = ' + table_name_2 + '.' + att_name_additionally_1;
                    stmt += ' AND ';
                    stmt += 'q1.' + att_name_1 + ' = ' + table_name_2 + '.' + att_name_1;
                    stmt += ')  ';
                }
            }
            if(projection_dec === 1){ //fehler in projection
                stmt += '\nJOIN ' + table_name_2 + '\n';
                stmt += 'ON(';
                if (order_in_condition === 'inorder') {
                    stmt += 'q1.' + att_name_additionally_2 + ' = ' + table_name_2 + '.' + att_name_additionally_2;
                    stmt += ' AND ';
                    stmt += 'q1.' + att_name_additionally_1 + ' = ' + table_name_2 + '.' + att_name_additionally_1;
                    stmt += ')  ';
                }
                if (order_in_condition === 'reversed') {
                    stmt += 'q1.' + att_name_additionally_1 + ' = ' + table_name_2 + '.' + att_name_additionally_1;
                    stmt += ' AND ';
                    stmt += 'q1.' + att_name_additionally_2 + ' = ' + table_name_2 + '.' + att_name_additionally_2;
                    stmt += ')  ';
                }
            }
            switch (att_name_additionally_2_pos) {
                case 0:
                    stmt += table_name_2 + '(' + att_name_additionally_2 + ',' + att_name_additionally_1 + ',' + att_name_sub + ')';
                    break;
                case 1:
                    stmt += table_name_2 + '(' + att_name_additionally_1 + ',' + att_name_additionally_2 + ',' + att_name_sub + ')';
                    break;
                case 2:
                    stmt += table_name_2 + '(' + att_name_additionally_1 + ',' + att_name_sub + ',' + att_name_additionally_2 + ')';
                    break;
            }
        }







        return stmt;
    }

    built_join_on_uneven(join_type, pos_error, order_in_condition){


        var att_name_1 = helper.get_name_not_used_yet();
        var att_name_2 = helper.get_name_not_used_yet();
        var att_name_sub = helper.get_name_not_used_yet();

        var att_name_1_2 = helper.get_name_not_used_yet();
        var att_name_2_2 = helper.get_name_not_used_yet();
        var att_name_sub_2 = helper.get_name_not_used_yet();

        var table_name_1 = helper.get_name_not_used_yet();
        var table_name_2 = helper.get_name_not_used_yet();
        var table_name_sub = helper.get_name_not_used_yet();

        var att_name_additionally_1 = helper.get_name_not_used_yet();
        var att_name_additionally_1_2 = helper.get_name_not_used_yet();
        var att_name_additionally_2 = helper.get_name_not_used_yet();
        var att_name_additionally_sub = helper.get_name_not_used_yet();
        var att_name_additionally_1_pos = document.new_random_integer(3);
        var att_name_additionally_2_pos = document.new_random_integer(3);
        var att_name_additionally_sub_pos = document.new_random_integer(3);
        var att_name_wrong = helper.get_name_not_used_yet();


        var stmt = '';
        if(pos_error === '1'){
            stmt += '(SELECT ' + att_name_1 + ',' + att_name_additionally_1 + ',' + att_name_sub + '\nFROM ' +
                table_name_1 + ' JOIN ' + table_name_sub + '\nON(';
        }
        if(pos_error === '2'){
            stmt += '(SELECT ' + att_name_1 + ',' + att_name_additionally_1 + ',' + att_name_wrong + '\nFROM ' +
                table_name_1 + ' JOIN ' + table_name_sub + '\nON(';
        }
        if (pos_error === '3' || pos_error === '4'){
            stmt += '(SELECT ' + att_name_1 + ',' + att_name_additionally_1 + ',' + att_name_sub + '\nFROM ' +
                table_name_1 + ' JOIN ' + table_name_sub + '\nON(';
        }

        if(order_in_condition === 'inorder'){
            stmt += table_name_1 + '.' + att_name_1 + ' = ' + table_name_sub + '.' + att_name_1_2;
            stmt += ' AND ';
            stmt += table_name_1 + '.' + att_name_sub + ' = ' + table_name_sub + '.' + att_name_sub_2;
            stmt += ')    ';
        }
        if(order_in_condition === 'reversed'){
            stmt += table_name_1 + '.' + att_name_sub + ' = ' + table_name_sub + '.' + att_name_sub_2;
            stmt += ' AND ';
            stmt += table_name_1 + '.' + att_name_1 + ' = ' + table_name_sub + '.' + att_name_1_2;
            stmt += ')    ';
        }

        if (pos_error === '3' || pos_error === '4') {
            switch (att_name_additionally_1_pos) {
                case 0:
                    stmt += table_name_1 + '(' + att_name_additionally_1 + ',' + att_name_1 + ',' + att_name_sub + ')';
                    break;
                case 1:
                    stmt += table_name_1 + '(' + att_name_1 + ',' + att_name_additionally_1 + ',' + att_name_sub + ')';
                    break;
                case 2:
                    stmt += table_name_1 + '(' + att_name_1 + ',' + att_name_sub + ',' + att_name_additionally_1 + ')';
                    break;
            }
            stmt += '\n)q1                            ';
            switch (att_name_additionally_sub_pos) {
                case 0:
                    stmt += table_name_sub + '(' + att_name_additionally_sub + ',' + att_name_1_2 + ',' + att_name_sub_2 + ')';
                    break;
                case 1:
                    stmt += table_name_sub + '(' + att_name_1_2 + ',' + att_name_additionally_sub + ',' + att_name_sub_2 + ')';
                    break;
                case 2:
                    stmt += table_name_sub + '(' + att_name_1_2 + ',' + att_name_sub_2 + ',' + att_name_additionally_sub + ')';
                    break;
            }
        }
        if (pos_error === '1' || pos_error === '2') {
            var att_name_1_pos_dec = document.new_random_integer(2);


            if (pos_error === '1') {
                switch (att_name_additionally_1_pos) {
                    case 0:
                        stmt += table_name_1 + '(' + att_name_additionally_1 + ',' + att_name_1 + ',' + att_name_sub + ')';
                        break;
                    case 1:
                        stmt += table_name_1 + '(' + att_name_1 + ',' + att_name_additionally_1 + ',' + att_name_sub + ')';
                        break;
                    case 2:
                        stmt += table_name_1 + '(' + att_name_1 + ',' + att_name_sub + ',' + att_name_additionally_1 + ')';
                        break;
                }
                stmt += '\n)q1                            ';
                switch (att_name_additionally_sub_pos) {
                    case 0:
                        stmt += table_name_sub + '(' + att_name_additionally_sub + ',' + att_name_wrong + ',' + att_name_sub_2 + ')';
                        break;
                    case 1:
                        stmt += table_name_sub + '(' + att_name_wrong + ',' + att_name_additionally_sub + ',' + att_name_sub_2 + ')';
                        break;
                    case 2:
                        stmt += table_name_sub + '(' + att_name_wrong + ',' + att_name_sub_2 + ',' + att_name_additionally_sub + ')';
                        break;
                }
            } else {
                switch (att_name_additionally_1_pos) {
                    case 0:
                        stmt += table_name_1 + '(' + att_name_additionally_1 + ',' + att_name_1 + ',' + att_name_sub + ')';
                        break;
                    case 1:
                        stmt += table_name_1 + '(' + att_name_1 + ',' + att_name_additionally_1 + ',' + att_name_sub + ')';
                        break;
                    case 2:
                        stmt += table_name_1 + '(' + att_name_1 + ',' + att_name_sub + ',' + att_name_additionally_1 + ')';
                        break;
                }
                stmt += '\n)q1                            ';
                switch (att_name_additionally_sub_pos) {
                    case 0:
                        stmt += table_name_sub + '(' + att_name_additionally_sub + ',' + att_name_1_2 + ',' + att_name_wrong + ')';
                        break;
                    case 1:
                        stmt += table_name_sub + '(' + att_name_1_2 + ',' + att_name_additionally_sub + ',' + att_name_wrong + ')';
                        break;
                    case 2:
                        stmt += table_name_sub + '(' + att_name_1_2 + ',' + att_name_wrong + ',' + att_name_additionally_sub + ')';
                        break;
                }
            }
        }

        stmt += '\nJOIN ' + table_name_2 + '\n';
        stmt += 'ON(';
        if (pos_error !== '3') {
            if (order_in_condition === 'inorder') {
                stmt += 'q1.' + att_name_1 + ' = ' + table_name_2 + '.' + att_name_1_2;
                stmt += ' AND ';
                stmt += 'q1.' + att_name_additionally_1 + ' = ' + table_name_2 + '.' + att_name_additionally_1_2;
                stmt += ')  ';
            }
            if (order_in_condition === 'reversed') {
                stmt += 'q1.' + att_name_additionally_1 + ' = ' + table_name_2 + '.' + att_name_additionally_1_2;
                stmt += ' AND ';
                stmt += 'q1.' + att_name_1 + ' = ' + table_name_2 + '.' + att_name_1_2;
                stmt += ')  ';
            }
            switch (att_name_additionally_2_pos) {
                case 0:
                    stmt += table_name_2 + '(' + att_name_additionally_2 + ',' + att_name_additionally_1_2 + ',' + att_name_1_2 + ')';
                    break;
                case 1:
                    stmt += table_name_2 + '(' + att_name_additionally_1_2 + ',' + att_name_additionally_2 + ',' + att_name_1_2 + ')';
                    break;
                case 2:
                    stmt += table_name_2 + '(' + att_name_additionally_1_2 + ',' + att_name_1_2 + ',' + att_name_additionally_2 + ')';
                    break;
            }
        }
        if(pos_error === '3') {
            var projection_dec = 1;//document.new_random_integer(2);
            if(projection_dec === 0){ //the error is in the missing attribute in the table
                if (order_in_condition === 'inorder') {
                    stmt += 'q1.' + att_name_1 + ' = ' + table_name_2 + '.' + att_name_1_2;
                    stmt += ' AND ';
                    stmt += 'q1.' + att_name_additionally_1 + ' = ' + table_name_2 + '.' + att_name_additionally_1_2;
                    stmt += ')  ';
                }
                if (order_in_condition === 'reversed') {
                    stmt += 'q1.' + att_name_additionally_1 + ' = ' + table_name_2 + '.' + att_name_additionally_1_2;
                    stmt += ' AND ';
                    stmt += 'q1.' + att_name_1 + ' = ' + table_name_2 + '.' + att_name_1_2;
                    stmt += ')  ';
                }
                switch (att_name_additionally_2_pos) {
                    case 0:
                        stmt += table_name_2 + '(' + att_name_additionally_2 + ',' + att_name_additionally_1_2 + ',' + att_name_sub + ')';
                        break;
                    case 1:
                        stmt += table_name_2 + '(' + att_name_additionally_1_2 + ',' + att_name_additionally_2 + ',' + att_name_sub + ')';
                        break;
                    case 2:
                        stmt += table_name_2 + '(' + att_name_additionally_1_2 + ',' + att_name_sub + ',' + att_name_additionally_2 + ')';
                        break;
                }
            }
            if(projection_dec === 1){ //the error is in the wrong call of the select attributes
                var inner_dec = document.new_random_integer(2);
                if(inner_dec === 0){
                    if (order_in_condition === 'inorder') {
                        stmt += 'q1.' + att_name_additionally_2 + ' = ' + table_name_2 + '.' + att_name_1_2;
                        stmt += ' AND ';
                        stmt += 'q1.' + att_name_additionally_1 + ' = ' + table_name_2 + '.' + att_name_additionally_1_2;
                        stmt += ')  ';
                    }
                    if (order_in_condition === 'reversed') {
                        stmt += 'q1.' + att_name_additionally_1 + ' = ' + table_name_2 + '.' + att_name_additionally_1_2;
                        stmt += ' AND ';
                        stmt += 'q1.' + att_name_additionally_2 + ' = ' + table_name_2 + '.' + att_name_1_2;
                        stmt += ')  ';
                    }
                }
                if(inner_dec === 1){
                    if (order_in_condition === 'inorder') {
                        stmt += 'q1.' + att_name_additionally_1_2 + ' = ' + table_name_2 + '.' + att_name_1_2;
                        stmt += ' AND ';
                        stmt += 'q1.' + att_name_additionally_1 + ' = ' + table_name_2 + '.' + att_name_additionally_2;
                        stmt += ')  ';
                    }
                    if (order_in_condition === 'reversed') {
                        stmt += 'q1.' + att_name_additionally_1 + ' = ' + table_name_2 + '.' + att_name_additionally_2;
                        stmt += ' AND ';
                        stmt += 'q1.' + att_name_additionally_1_2 + ' = ' + table_name_2 + '.' + att_name_1_2;
                        stmt += ')  ';
                    }
                }

                switch (att_name_additionally_2_pos) {
                    case 0:
                        stmt += table_name_2 + '(' + att_name_additionally_2 + ',' + att_name_additionally_1_2 + ',' + att_name_1_2 + ')';
                        break;
                    case 1:
                        stmt += table_name_2 + '(' + att_name_additionally_1_2 + ',' + att_name_additionally_2 + ',' + att_name_1_2 + ')';
                        break;
                    case 2:
                        stmt += table_name_2 + '(' + att_name_additionally_1_2 + ',' + att_name_1_2 + ',' + att_name_additionally_2 + ')';
                        break;
                }
            }
        }
            return stmt;
    }

    built_join_using(join_type, pos_error, order_in_condition){

        var att_name_1 = helper.get_name_not_used_yet();
        var att_name_2 = helper.get_name_not_used_yet();
        var att_name_sub = helper.get_name_not_used_yet();

        var att_name_1_2 = helper.get_name_not_used_yet();
        var att_name_2_2 = helper.get_name_not_used_yet();

        var table_name_1 = helper.get_name_not_used_yet();
        var table_name_2 = helper.get_name_not_used_yet();
        var table_name_sub = helper.get_name_not_used_yet();

        var att_name_additionally_1 = helper.get_name_not_used_yet();
        var att_name_additionally_2 = helper.get_name_not_used_yet();
        var att_name_additionally_sub = helper.get_name_not_used_yet();
        var att_name_additionally_1_pos = document.new_random_integer(3);
        var att_name_additionally_2_pos = document.new_random_integer(3);
        var att_name_additionally_sub_pos = document.new_random_integer(3);

        var att_name_wrong = helper.get_name_not_used_yet();

        var stmt = '';
        if(pos_error === '1'){
            stmt += '(SELECT ' + att_name_wrong + ',' + att_name_additionally_1 + ',' + att_name_sub + '\nFROM ' +
                table_name_1 + ' JOIN ' + table_name_sub + '\nUSING(';
        }
        if(pos_error === '2'){
            stmt += '(SELECT ' + att_name_wrong + ',' + att_name_additionally_1 + ',' + att_name_wrong + '\nFROM ' +
                table_name_1 + ' JOIN ' + table_name_sub + '\nUSING(';
        }
        if (pos_error === '3' || pos_error === '4'){
            stmt += '(SELECT ' + att_name_1 + ',' + att_name_additionally_1 + ',' + att_name_sub + '\nFROM ' +
                table_name_1 + ' JOIN ' + table_name_sub + '\nUSING(';
        }

            if (order_in_condition === 'inorder') {
                stmt += att_name_1;
                stmt += ',';
                stmt += att_name_sub;
                stmt += ')  ';
            }
            if (order_in_condition === 'reversed') {
                stmt += att_name_sub;
                stmt += ',';
                stmt += att_name_1;
                stmt += ')  ';
            }

            if (pos_error === '3' || pos_error === '4') {
                switch (att_name_additionally_1_pos) {
                    case 0:
                        stmt += table_name_1 + '(' + att_name_additionally_1 + ',' + att_name_1 + ',' + att_name_sub + ')';
                        break;
                    case 1:
                        stmt += table_name_1 + '(' + att_name_1 + ',' + att_name_additionally_1 + ',' + att_name_sub + ')';
                        break;
                    case 2:
                        stmt += table_name_1 + '(' + att_name_1 + ',' + att_name_sub + ',' + att_name_additionally_1 + ')';
                        break;
                }
                stmt += '\n)q1         ';
                switch (att_name_additionally_sub_pos) {
                    case 0:
                        stmt += table_name_sub + '(' + att_name_additionally_sub + ',' + att_name_1 + ',' + att_name_sub + ')';
                        break;
                    case 1:
                        stmt += table_name_sub + '(' + att_name_1 + ',' + att_name_additionally_sub + ',' + att_name_sub + ')';
                        break;
                    case 2:
                        stmt += table_name_sub + '(' + att_name_1 + ',' + att_name_sub + ',' + att_name_additionally_sub + ')';
                        break;
                }
            }
            if (pos_error === '1' || pos_error === '2') {
                var att_name_1_pos_dec = document.new_random_integer(2);


                if (pos_error === '1') {
                    switch (att_name_additionally_1_pos) {
                        case 0:
                            stmt += table_name_1 + '(' + att_name_additionally_1 + ',' + att_name_wrong + ',' + att_name_sub + ')';
                            break;
                        case 1:
                            stmt += table_name_1 + '(' + att_name_wrong + ',' + att_name_additionally_1 + ',' + att_name_sub + ')';
                            break;
                        case 2:
                            stmt += table_name_1 + '(' + att_name_wrong + ',' + att_name_sub + ',' + att_name_additionally_1 + ')';
                            break;
                    }
                    stmt += '\n)q1         ';
                    switch (att_name_additionally_sub_pos) {
                        case 0:
                            stmt += table_name_sub + '(' + att_name_additionally_sub + ',' + att_name_wrong + ',' + att_name_sub + ')';
                            break;
                        case 1:
                            stmt += table_name_sub + '(' + att_name_wrong + ',' + att_name_additionally_sub + ',' + att_name_sub + ')';
                            break;
                        case 2:
                            stmt += table_name_sub + '(' + att_name_wrong + ',' + att_name_sub + ',' + att_name_additionally_sub + ')';
                            break;
                    }
                } else {
                    switch (att_name_additionally_1_pos) {
                        case 0:
                            stmt += table_name_1 + '(' + att_name_additionally_1 + ',' + att_name_1 + ',' + att_name_wrong + ')';
                            break;
                        case 1:
                            stmt += table_name_1 + '(' + att_name_1 + ',' + att_name_additionally_1 + ',' + att_name_wrong + ')';
                            break;
                        case 2:
                            stmt += table_name_1 + '(' + att_name_1 + ',' + att_name_wrong + ',' + att_name_additionally_1 + ')';
                            break;
                    }
                    stmt += '\n)q1         ';
                    switch (att_name_additionally_sub_pos) {
                        case 0:
                            stmt += table_name_sub + '(' + att_name_additionally_sub + ',' + att_name_1 + ',' + att_name_wrong + ')';
                            break;
                        case 1:
                            stmt += table_name_sub + '(' + att_name_1 + ',' + att_name_additionally_sub + ',' + att_name_wrong + ')';
                            break;
                        case 2:
                            stmt += table_name_sub + '(' + att_name_1 + ',' + att_name_wrong + ',' + att_name_additionally_sub + ')';
                            break;
                    }
                }
            }
            stmt += '\nJOIN ' + table_name_2 + '\n';
            stmt += 'USING(';
            if (pos_error !== '3') {
                if (order_in_condition === 'inorder') {
                    stmt += att_name_1;
                    stmt += ',';
                    stmt += att_name_additionally_1;
                    stmt += ')  ';
                }
                if (order_in_condition === 'reversed') {
                    stmt += att_name_additionally_1;
                    stmt += ',';
                    stmt += att_name_1;
                    stmt += ')  ';
                }
                switch (att_name_additionally_2_pos) {
                    case 0:
                        stmt += table_name_2 + '(' + att_name_additionally_2 + ',' + att_name_additionally_1 + ',' + att_name_1 + ')';
                        break;
                    case 1:
                        stmt += table_name_2 + '(' + att_name_additionally_1 + ',' + att_name_additionally_2 + ',' + att_name_1 + ')';
                        break;
                    case 2:
                        stmt += table_name_2 + '(' + att_name_additionally_1 + ',' + att_name_1 + ',' + att_name_additionally_2 + ')';
                        break;
                }
            }
            if(pos_error === '3'){
                var projection_dec = document.new_random_integer(2);
                if(projection_dec === 0){
                    if (order_in_condition === 'inorder') {
                        stmt += att_name_1;
                        stmt += ',';
                        stmt += att_name_additionally_1;
                        stmt += ')  ';
                    }
                    if (order_in_condition === 'reversed') {
                        stmt += att_name_additionally_1;
                        stmt += ',';
                        stmt += att_name_1;
                        stmt += ')  ';
                    }
                    switch (att_name_additionally_2_pos) {
                        case 0:
                            stmt += table_name_2 + '(' + att_name_additionally_2 + ',' + att_name_additionally_1 + ',' + att_name_sub + ')';
                            break;
                        case 1:
                            stmt += table_name_2 + '(' + att_name_additionally_1 + ',' + att_name_additionally_2 + ',' + att_name_sub + ')';
                            break;
                        case 2:
                            stmt += table_name_2 + '(' + att_name_additionally_1 + ',' + att_name_sub + ',' + att_name_additionally_2 + ')';
                            break;
                    }
                }else{
                    if (order_in_condition === 'inorder') {
                        stmt += att_name_additionally_2;
                        stmt += ',';
                        stmt += att_name_additionally_1;
                        stmt += ')  ';
                    }
                    if (order_in_condition === 'reversed') {
                        stmt += att_name_additionally_1;
                        stmt += ',';
                        stmt += att_name_additionally_2;
                        stmt += ')  ';
                    }
                    switch (att_name_additionally_2_pos) {
                        case 0:
                            stmt += table_name_2 + '(' + att_name_additionally_2 + ',' + att_name_additionally_1 + ',' + att_name_sub + ')';
                            break;
                        case 1:
                            stmt += table_name_2 + '(' + att_name_additionally_1 + ',' + att_name_additionally_2 + ',' + att_name_sub + ')';
                            break;
                        case 2:
                            stmt += table_name_2 + '(' + att_name_additionally_1 + ',' + att_name_sub + ',' + att_name_additionally_2 + ')';
                            break;
                    }
                }
            }

        return stmt;
    }

    built_placeholder(join_type, pos_error, order_in_condition, pos_subquery){
        var stmt = '';
        if(pos_subquery === 'first'){
            stmt += 'SELECT *\n'+
                    'FROM (SELECT d,f,w'+
                    'FROM [t1] JOIN [t2]'+
                    'USING(w,d)  [t1](f,d,w)'+
                    ')q1         [t2](d,k,w)'+
                    '    JOIN [t3]'+
                    '    USING(f,d)  [t3](f,x,d)';
        }
    }
}

const helper = new Helper();
const stringBuilder = new stringBuilderClass();
var i;
var i2;
var i3;
var i4;
var i5;

document.experiment_definition(
    {
        experiment_name:'Max Case_21',
        seed:'42',
        introduction_pages:['note: the experiment is not really polished. That means the navigation pages are not adjusted yet.\n' +
        'You can navigate through the first pages with the right arrow and ENTER. ' +
        'To escape the training session, press ESC.\n' +

            'Goal of the experiment: \n' +
        'You see just the joining condition of the two tables on right. ' +
        'Your task is to identify whether the shown condition is correct or incorrect. \n' +
        'Incorrect means that one attribute in the condition does not exist in the tables.\n' +
        'Type in c for a correct condition, or i for an incorrect one and then ENTER to get to the next task..\n\n',

            'The experiment consists of a training phase an an experiment phase.\n\n' +
            'The training phase is only for you to get familiar with the ' +
            'questions and the experiment itself.' +
            'You can cancel the training session whenever you like. As long ' +
            'you do not cancel the training, new code snippets will be shown to you.\n\n' +
            'When the you see the first task in the training session, please increase/decrease the font ' +
            'in the browser so that you can see all lines of code (plus some additional lines).\n' +
            'Depending on your browser and your machine, this could be done by pressing [CTRL] + [+] ' +
            'or [CTRL] + [.].\n\n' +
            'Press [Return] to enter the training phase.'],
        pre_run_instruction:'Please put your fingers on i and c.\n\nWhen you press [Enter] the first task will be shown.',
        finish_pages:['Thanks for participating. When you press [Enter], the experiments data will be downloaded.\n\n' +
        'If you want to contribute to research, you can send the downloaded file to maximilian.heinemann@stud.uni-due.de.'],
        layout:[
            //Welche Variablen braucht mein Versuchs
            {variable:'Join_Type',treatments:['join_on_even', 'join_on_uneven', 'join_using']}, //, 'join_on_even', 'join_on_uneven', 'join_using'
            {variable:'pos_error',treatments:['1', '2', '3', '4']}, //'1', '2', '3', '4'
        ],
        repetitions:10,                    // Anzahl der Wiederholungen pro Treatmentcombination
        accepted_responses:['c', 'i'], // Tasten, die vom Experiment als Eingabe akzeptiert werden
        task_configuration:(t)=>{



            let join_type = t.treatment_combination[0].value;
            let pos_error = t.treatment_combination[1].value;


            let task = '';

            task += stringBuilder.create_stmt(join_type, pos_error);

            console.log(t.treatment_combination);

            if(t.treatment_combination[0].value==='join_on_even'){
                t.code = task;
                if(pos_error === '4'){
                    t.expected_answer = 'c';
                }else{
                    t.expected_answer = 'i';
                }
            }

            if(t.treatment_combination[0].value==='join_on_uneven'){
                t.code = task;
                if(pos_error === '4'){
                    t.expected_answer = 'c';
                }else{
                    t.expected_answer = 'i';
                }
            }

            if(t.treatment_combination[0].value==='join_using'){
                t.code = task;
                if(pos_error === '4'){
                    t.expected_answer = 'c';
                }else{
                    t.expected_answer = 'i';
                }
            }

            t.after_task_string = ()=>'The correct answer for the code was: ' + t.expected_answer;

        }
    }
);



