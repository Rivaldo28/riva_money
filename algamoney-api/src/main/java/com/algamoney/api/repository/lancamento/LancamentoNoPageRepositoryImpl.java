package com.algamoney.api.repository.lancamento;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import com.algamoney.api.model.Lancamento;
import com.algamoney.api.repository.filter.LancamentoFilter;
import com.algamoney.api.repository.projection.ResumoLancamento;

@Repository
public class LancamentoNoPageRepositoryImpl implements LancamentoNoPageRepositoryQuery {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Lancamento> filtrar(LancamentoFilter lancamentoFilter) {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT l FROM Lancamento l ");
        sql.append("WHERE 1 = 1 ");

        if (!StringUtils.isEmpty(lancamentoFilter.getDescricao())) {
            sql.append("AND LOWER(l.descricao) LIKE :descricao ");
        }

        if (lancamentoFilter.getDataVencimentoDe() != null) {
            sql.append("AND l.dataVencimento >= :dataVencimentoDe ");
        }

        if (lancamentoFilter.getDataVencimentoAte() != null) {
            sql.append("AND l.dataVencimento <= :dataVencimentoAte ");
        }

        TypedQuery<Lancamento> query = entityManager.createQuery(sql.toString(), Lancamento.class);

        if (!StringUtils.isEmpty(lancamentoFilter.getDescricao())) {
            query.setParameter("descricao", "%" + lancamentoFilter.getDescricao().toLowerCase() + "%");
        }

        if (lancamentoFilter.getDataVencimentoDe() != null) {
            query.setParameter("dataVencimentoDe", lancamentoFilter.getDataVencimentoDe());
        }

        if (lancamentoFilter.getDataVencimentoAte() != null) {
            query.setParameter("dataVencimentoAte", lancamentoFilter.getDataVencimentoAte());
        }

        return query.getResultList();
    }

    @Override
    public List<ResumoLancamento> resumir(LancamentoFilter lancamentoFilter) {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT new com.algamoney.api.repository.projection.ResumoLancamento(");
        sql.append("l.codigo, l.descricao, l.dataVencimento, l.dataPagamento, l.valor, l.tipo, c.nome, p.nome) ");
        sql.append("FROM Lancamento l ");
        sql.append("JOIN l.categoria c ");
        sql.append("JOIN l.pessoa p ");
        sql.append("WHERE 1 = 1 ");

        if (!StringUtils.isEmpty(lancamentoFilter.getDescricao())) {
            sql.append("AND LOWER(l.descricao) LIKE :descricao ");
        }

        if (lancamentoFilter.getDataVencimentoDe() != null) {
            sql.append("AND l.dataVencimento >= :dataVencimentoDe ");
        }

        if (lancamentoFilter.getDataVencimentoAte() != null) {
            sql.append("AND l.dataVencimento <= :dataVencimentoAte ");
        }

        TypedQuery<ResumoLancamento> query = entityManager.createQuery(sql.toString(), ResumoLancamento.class);

        if (!StringUtils.isEmpty(lancamentoFilter.getDescricao())) {
            query.setParameter("descricao", "%" + lancamentoFilter.getDescricao().toLowerCase() + "%");
        }

        if (lancamentoFilter.getDataVencimentoDe() != null) {
            query.setParameter("dataVencimentoDe", lancamentoFilter.getDataVencimentoDe());
        }

        if (lancamentoFilter.getDataVencimentoAte() != null) {
            query.setParameter("dataVencimentoAte", lancamentoFilter.getDataVencimentoAte());
        }

        return query.getResultList();
    }

}