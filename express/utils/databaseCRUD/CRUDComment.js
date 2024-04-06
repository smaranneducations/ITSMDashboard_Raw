import sql from 'mssql';
import mssqlconfig from '../../mssqlconfig.js'; // Ensure this path is correct

const findComments = async () => {
    try {
        await sql.connect(mssqlconfig);
        const result = await sql.query(`SELECT * FROM Comments`);
        return result.recordset;
    } catch (err) {
        throw err;
    } finally {
        await sql.close();
    }
};

const createComment = async (comment) => {
    try {
        await sql.connect(mssqlconfig);
        const query = `INSERT INTO Comments (Text, ParentId) VALUES ('${comment.text}', ${comment.parentId || 'NULL'})`;
        await sql.query(query);
       
        const insertedComment = await sql.query(`SELECT TOP 1 * FROM Comments ORDER BY Id DESC`);
        return insertedComment.recordset[0];
    } catch (err) {
        throw err;
    } finally {
        await sql.close();
    }
};

const updateComment = async (id, updatedText) => {
    try {
        await sql.connect(mssqlconfig);
        const query = `UPDATE Comments SET Text = '${updatedText}' WHERE Id = ${id}`;
        await sql.query(query);
        const updatedComment = await sql.query(`SELECT * FROM Comments WHERE Id = ${id}`);
        return updatedComment.recordset[0];
    } catch (err) {
        throw err;
    } finally {
        await sql.close();
    }
};

const deleteComment = async (id) => {
    try {
        await sql.connect(mssqlconfig);
        const deleteQuery = `DELETE FROM Comments WHERE Id = ${id}`;
        await sql.query(deleteQuery);
        return { id };
    } catch (err) {
        throw err;
    } finally {
        await sql.close();
    }
};

export { findComments, createComment, updateComment, deleteComment };
